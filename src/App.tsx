import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';

const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a frame so the target section exists after a route change
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-mint focus:px-5 focus:py-3 focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Nav />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
