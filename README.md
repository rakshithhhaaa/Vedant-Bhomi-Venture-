# Vedant Bhomi Venture (VEBCO) — Official Website & Local Content Manager

100% static, zero-cost, serverless website and local laptop admin tool for **Vedant Bhomi Venture** (also known as **Vedaanth ECO Buildcon / VEBCO**) — eco-friendly construction company specializing in CSEB (Compressed Stabilized Earth Blocks) and mortar-free interlocking brick technology across **Bangalore, Karnataka, Tamil Nadu, and Andhra Pradesh**.

---

## 🌟 Key Architecture Highlights

- **Zero Third-Party Services & Zero Database**: No Supabase, no external backend, no recurring costs.
- **Static JSON Data Architecture**: All content (catalogue items, rates, videos, gallery, testimonials, site settings) is stored in `src/data/*.json` and imported statically at build time.
- **Laptop-Only Local Admin Tool**: Run `npm run admin` to launch an Express server bound strictly to `127.0.0.1:4000` on your laptop. Features a modern dashboard to edit content, upload photos (auto-compressed to WebP using `sharp`), and a 1-click **"Publish to GitHub"** button that commits and pushes to GitHub.
- **Zero Admin Code in Production**: Admin and server dependencies are completely isolated from the production bundle.
- **Direct WhatsApp & Mailto Enquiries**: Enquiry forms construct formatted project requests and open prefilled WhatsApp chats (`https://wa.me/919742163589`) with mailto fallbacks and honeypot spam protection.
- **Strict Real-Images Rule**: Zero stock or AI placeholder photos. Unpopulated slots display clean neutral clay placeholders; unpopulated sections (e.g. gallery/testimonials) are hidden automatically.

---

## 📁 Repository Structure

```
/home/raks/Documents/Vedaath/
├── admin/                         # Local Laptop-Only Admin Server (Not in production build)
│   ├── public/
│   │   └── index.html             # Local Admin Single-Page Dashboard
│   └── server.js                  # Express server bound to 127.0.0.1:4000 (sharp WebP + Git publish)
├── public/
│   ├── images/                    # Real project images (.webp format)
│   │   └── .gitkeep
│   ├── favicon.svg                # Eco brick & leaf vector icon
│   ├── robots.txt                 # SEO crawler directions
│   └── sitemap.xml                # Search engine sitemap
├── src/
│   ├── data/                      # 100% of website content (JSON)
│   │   ├── catalogue.json         # 9 turnkey models & per sq ft rates
│   │   ├── gallery.json           # Real site photos array
│   │   ├── settings.json          # Sitewide contact info, address, hours, headlines
│   │   ├── testimonials.json      # Real client reviews
│   │   └── videos.json            # 13 construction YouTube video reels
│   ├── components/                # Layout, SEO, Lightbox, LiteYouTube, Placeholder
│   ├── pages/                     # Home, Catalogue, Detail, Gallery, Videos, About, Contact
│   ├── lib/                       # Content loader, image helpers, anti-spam
│   ├── types/                     # TypeScript schema definitions
│   ├── App.tsx                    # HashRouter & Code-split pages
│   └── main.tsx                   # React root mount
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions zero-config Pages deploy
├── package.json
└── README.md
```

---

## 🚀 Running the Public Website (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🛠️ Running the Local Admin Tool (`npm run admin`)

The local admin manager runs **exclusively on your laptop** and is bound to `127.0.0.1`:

```bash
npm run admin
```
This automatically opens **`http://localhost:4000`** in your browser.

### Features in the Local Admin Dashboard:
1. **Catalogue Models & Rates**:
   - Add, edit, or delete house models.
   - Adjust prices (e.g. ₹2,750 / per sq ft) or set to "Contact for price".
   - Upload multiple real photos for any model. Images are automatically resized (max 1600px) and compressed to high-efficiency WebP into `public/images/`.
   - Toggle visibility and Home page featured status.
2. **Project Photo Gallery**:
   - Upload site photos categorized by type (Residential, Resort, Traditional, Commercial, Farmhouse, Academic).
3. **YouTube Video Reels**:
   - Add/edit videos. Paste standard YouTube URLs or video IDs; the system extracts the ID and previews the video.
4. **Client Testimonials**:
   - Add real client reviews and ratings.
5. **Global Site Settings**:
   - Update company name, brand name, service areas, default WhatsApp message, phone, WhatsApp number, emails, Jigani head office address, working hours, and homepage headlines.
6. **🚀 1-Click "Publish to GitHub" Button**:
   - Click the green button in the top right to commit all your changes and push directly to GitHub.
   - Displays clear success notifications or plain-language error diagnostics if a push requires rebase or credentials.

---

## 🚢 Publishing to GitHub Pages

### Initial Setup (One-time):
1. Create a repository on GitHub (e.g. `vedant-bhomi-venture`).
2. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial release of Vedant Bhomi Venture website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository: Go to **Settings** -> **Pages** -> under **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions builds the static site and deploys it automatically.

### Publishing Future Content Updates:
- **Option A (Easiest)**: Open `npm run admin`, make your edits, and click the **"Publish to GitHub"** button.
- **Option B (Terminal)**:
  ```bash
  git add .
  git commit -m "content: update catalogue and site photos"
  git push origin main
  ```

---

## 💾 Backups & Data Portability

Because all data lives in plain JSON files (`src/data/`) and photos live in `public/images/`, **the Git repository is your complete, permanent, portable backup**.
- Cloning the repo on any computer gives you the entire website, history, and admin panel with zero database migration steps.
- To make a backup archive at any time:
  ```bash
  git archive --format=zip HEAD -o vbv-backup-$(date +%F).zip
  ```

---

## 📷 Live Real Project Photography (13 Images in `public/images/`)

| # | Project | Filename | Description & Placement |
|---|---------|----------|-------------------------|
| 1 | **Valiant Academy (Kanakapura Rd)** | `valiant-academy-amphitheater.webp` | Semicircular open-air stone amphitheater (**Home Hero Feature**) |
| 2 | **Valiant Academy (Kanakapura Rd)** | `valiant-academy-campus-lawn.webp` | Campus lawn, clay tile pavilion & amphitheater steps |
| 3 | **Valiant Academy (Kanakapura Rd)** | `valiant-academy-courtyard.webp` | Central courtyard with water feature (**About Page Feature**) |
| 4 | **Valiant Academy (Kanakapura Rd)** | `valiant-academy-veranda.webp` | Covered colonnade veranda walkway with circular pillars |
| 5 | **Valiant Academy (Kanakapura Rd)** | `valiant-academy-interior-hall.webp` | Multi-purpose campus hall with patterned tile flooring |
| 6 | **Dindigul Eco Mud House (TN)** | `dindigul-eco-house-exterior.webp` | 2-Storey CSEB villa with terracotta jalis & clay tile roof |
| 7 | **Dindigul Eco Mud House (TN)** | `dindigul-interior-staircase.webp` | Living room with Athangudi tiles & wooden staircase |
| 8 | **Dindigul Eco Mud House (TN)** | `dindigul-skylight-atrium.webp` | Double-height atrium with passive natural skylight |
| 9 | **Dindigul Eco Mud House (TN)** | `dindigul-veranda-courtyard.webp` | Entrance veranda with traditional wooden gate & kolam border |
| 10 | **K.R. Puram Eco Residence (BLR)** | `kr-puram-eco-house-exterior.webp` | Multi-storey CSEB home with ornamental brick archway |
| 11 | **K.R. Puram Eco Residence (BLR)** | `kr-puram-living-hall-filler-slab.webp` | Living hall with decorative terracotta filler slab ceiling |
| 12 | **K.R. Puram Eco Residence (BLR)** | `kr-puram-stairwell-jali-light.webp` | Stairwell with bamboo railing and jali light patterns |
| 13 | **K.R. Puram Eco Residence (BLR)** | `kr-puram-vaulted-brick-skylight.webp` | Handcrafted vaulted CSEB earth brick dome with central skylight |

---

## 📞 Real Business Information

- **Company**: Vedant Bhomi Venture
- **Brand / Known As**: Vedaanth ECO Buildcon (VEBCO)
- **Tagline**: Eco Friendly Construction
- **Service Areas**: Karnataka, Tamil Nadu, and Andhra Pradesh (Head Office in Jigani, Karnataka)
- **Address**: Bommasandra Jigani Link Rd, Jigani, Karnataka 560105, India
- **Phone / WhatsApp**: `+91 9742163589`
- **Emails**: `vedaanthecobuildcon@gmail.com`, `vebcoadm@gmail.com`
- **YouTube**: [https://www.youtube.com/@vedaanthecobuildcon7626](https://www.youtube.com/@vedaanthecobuildcon7626)
- **WhatsApp Catalogue**: [https://wa.me/c/919742163589](https://wa.me/c/919742163589)
