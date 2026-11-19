import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMeta } from '../lib/useMeta';

export default function NotFound() {
  useMeta('Page not found · Obende Michael');
  return (
    <main id="main" className="wrap flex min-h-[80vh] flex-col justify-center pt-32">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display text-[clamp(3rem,9vw,8rem)]">
        Nothing <span className="accent-serif text-mint">here.</span>
      </h1>
      <p className="lede mt-6 max-w-md">The page you followed doesn’t exist. The work is one click away.</p>
      <Link to="/#work" className="btn btn-primary mt-10 self-start">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to the work
      </Link>
    </main>
  );
}
