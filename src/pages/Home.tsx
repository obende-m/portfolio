import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Experience from '../components/Experience';
import Stack from '../components/Stack';
import MoreWork from '../components/MoreWork';
import Contact from '../components/Contact';
import { useMeta } from '../lib/useMeta';

export default function Home() {
  useMeta(
    'Obende Michael — Software Developer',
    'Obende Michael Onimisi builds web applications and systems: an election platform with audited, single-use voting links, a hospital patient-flow platform, and websites for schools, nonprofits and businesses in Nigeria.',
  );
  return (
    <main id="main">
      <Hero />
      <Work />
      <About />
      <Experience />
      <Stack />
      <MoreWork />
      <Contact />
    </main>
  );
}
