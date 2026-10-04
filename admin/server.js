import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');
const imagesDir = path.join(rootDir, 'public', 'images');

// Ensure directories exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const app = express();
const PORT = 4000;
const HOST = '127.0.0.1';

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));
// Also serve public images for immediate preview in admin
app.use('/images', express.static(imagesDir));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
});

function readJsonFile(filename, defaultValue) {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

function writeJsonFile(filename, data) {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// 1. Get all data
app.get('/api/data', (req, res) => {
  try {
    const settings = readJsonFile('settings.json', {});
    const catalogue = readJsonFile('catalogue.json', []);
    const videos = readJsonFile('videos.json', []);
    const gallery = readJsonFile('gallery.json', []);
    const testimonials = readJsonFile('testimonials.json', []);

    res.json({
      success: true,
      data: {
        settings,
        catalogue,
        videos,
        gallery,
        testimonials,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Save specific data section
app.post('/api/save/:type', (req, res) => {
  const { type } = req.params;
  const validTypes = ['settings', 'catalogue', 'videos', 'gallery', 'testimonials'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ success: false, error: `Invalid data type '${type}'` });
  }

  try {
    writeJsonFile(`${type}.json`, req.body);
    res.json({ success: true, message: `${type}.json updated successfully!` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Upload & resize image to WebP
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image file uploaded' });
  }

  try {
    const originalName = req.file.originalname || 'image';
    const baseName = path.parse(originalName).name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const filename = `${baseName}-${Date.now()}.webp`;
    const targetPath = path.join(imagesDir, filename);

    // Resize to max 1600px width/height and convert to high-efficiency WebP
    await sharp(req.file.buffer)
      .rotate() // auto rotate based on EXIF orientation
      .resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85, effort: 4 })
      .toFile(targetPath);

    const relativeUrl = `images/${filename}`;
    res.json({
      success: true,
      url: relativeUrl,
      filename,
    });
  } catch (err) {
    console.error('Image processing error:', err);
    res.status(500).json({ success: false, error: `Image compression failed: ${err.message}` });
  }
});

// 4. Publish via Git (git add, commit, push)
app.post('/api/publish', (req, res) => {
  const commitMsg = req.body.message || `content: update website data via VEBCO local admin [${new Date().toISOString()}]`;

  // Helper to run shell command in root directory
  function runCommand(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, { cwd: rootDir }, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stdout, stderr });
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  (async () => {
    try {
      // Check if git is initialized
      if (!fs.existsSync(path.join(rootDir, '.git'))) {
        return res.status(400).json({
          success: false,
          error: 'Git repository is not initialized. Run "git init" and connect your GitHub repo first.',
        });
      }

      await runCommand('git add .');

      // Check status to see if there are changes to commit
      const statusRes = await runCommand('git status --porcelain');
      if (statusRes.stdout.trim().length > 0) {
        const safeMsg = commitMsg.replace(/"/g, '\\"');
        await runCommand(`git commit -m "${safeMsg}"`);
      }

      // Push to origin main
      const pushRes = await runCommand('git push origin main');

      res.json({
        success: true,
        message: 'Successfully pushed all updates to GitHub! Your site will deploy on GitHub Pages in ~1-2 minutes.',
        output: pushRes.stdout || pushRes.stderr || 'Pushed cleanly.',
      });
    } catch (errPayload) {
      const errStr = (errPayload.stderr || errPayload.error?.message || String(errPayload)).toLowerCase();
      let plainError = 'Git push failed. Please check your repository settings.';

      if (errStr.includes('no remote') || errStr.includes('fatal: \'origin\' does not appear to be a git repository')) {
        plainError = 'No GitHub remote repository is configured. Add your GitHub repository URL by running: git remote add origin <github-repo-url>';
      } else if (errStr.includes('permission denied') || errStr.includes('could not read username') || errStr.includes('authentication failed')) {
        plainError = 'GitHub authentication failed. Please configure your GitHub SSH key or GitHub CLI credentials (gh auth login).';
      } else if (errStr.includes('rejected') || errStr.includes('fetch first') || errStr.includes('non-fast-forward')) {
        plainError = 'GitHub rejected the push because remote has newer changes. Run "git pull --rebase" in your terminal first.';
      } else if (errStr.includes('could not resolve host') || errStr.includes('network is unreachable')) {
        plainError = 'Network error: Unable to connect to GitHub. Please check your internet connection.';
      } else if (errPayload.stderr) {
        plainError = `Git error: ${errPayload.stderr.trim()}`;
      }

      res.status(500).json({
        success: false,
        error: plainError,
        raw: errPayload.stderr || errPayload.stdout || errPayload.error?.message,
      });
    }
  })();
});

// Start listening strictly on 127.0.0.1
app.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}`;
  console.log('====================================================');
  console.log(`  VEBCO Local Admin Server running at: ${url}`);
  console.log(`  Bound strictly to ${HOST} (Local Laptop Only)`);
  console.log('  Press Ctrl+C to stop.');
  console.log('====================================================');

  // Attempt to open browser automatically
  open(url).catch(() => {
    // Ignore error in headless environments
  });
});
