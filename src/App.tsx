import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/layout/FloatingContact';
import { ScrollToTop } from './components/common/ScrollToTop';

// Lazy-loaded Public Pages for Code Splitting & Fast First Paint
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const CataloguePage = lazy(() => import('./pages/CataloguePage').then((m) => ({ default: m.CataloguePage })));
const CatalogueDetailPage = lazy(() => import('./pages/CatalogueDetailPage').then((m) => ({ default: m.CatalogueDetailPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const VideosPage = lazy(() => import('./pages/VideosPage').then((m) => ({ default: m.VideosPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-clay-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 border-4 border-terracotta-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-semibold text-earth-600">Loading Vedaanth ECO Buildcon...</p>
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/catalogue/:slug" element={<CatalogueDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
