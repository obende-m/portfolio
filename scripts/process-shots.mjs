// Converts raw project screenshots into optimised WebP files for the site.
// Usage: node scripts/process-shots.mjs <folder-with-raw-pngs>
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
const out = path.resolve('public/images/projects');
fs.mkdirSync(out, { recursive: true });

// name -> [source file, optional crop {left, top, width, height}, output width]
const jobs = {
  'ida-home': ['ida-d.png'],
  'ida-home-full': ['ida-full.png', { left: 0, top: 0, width: 1440, height: 1434 }],
  'ida-steps': ['ida-full.png', { left: 200, top: 680, width: 1040, height: 660 }],
  'ida-mobile': ['ida-m.png', null, 600],
  'ida-admin-login': ['ida-admin-d.png'],
  'ida-admin-login-mobile': ['ida-admin-m.png', null, 600],
  'qman-reception': ['qman-reception.png'],
  'qman-clinical': ['qman-clinical.png'],
  'qman-manager': ['qman-manager.png'],
  'qman-command': ['qman-command.png'],
  'qman-display': ['qman-display.png'],
  'qman-admin': ['qman-admin.png'],
  'qman-activity': ['qman-activity.png'],
  'qman-signin': ['qman-signin.png'],
  'bookdex-home': ['bookdex-d.png'],
  'bookdex-dashboard': ['bookdex-full.png', { left: 160, top: 640, width: 1120, height: 720 }],
  'bookdex-booking': ['bookdex-full.png', { left: 752, top: 3516, width: 600, height: 600 }, 900],
  'bookdex-invoice': ['bookdex-full.png', { left: 741, top: 6720, width: 522, height: 556 }, 900],
  'bookdex-mobile': ['bookdex-m.png', null, 600],
  'bomas-home': ['bomas-d.png'],
  'bomas-admissions': ['bomas-adm-d.png'],
  'bomas-mobile': ['bomas-m.png', null, 600],
  'bomas-admissions-mobile': ['bomas-adm-m.png', null, 600],
  'meraki-home': ['meraki-d.png'],
  'meraki-mobile': ['meraki-m.png', null, 600],
  'teekay-home': ['teekay-d.png'],
  'teekay-mobile': ['teekay-m.png', null, 600],
  'yokm-home': ['yokm-d.png'],
  'yokm-mobile': ['yokm-m.png', null, 600],
  'safety-home': ['safety-d.png'],
  'safety-mobile': ['safety-m.png', null, 600],
  'gulf-home': ['gulf-d.png'],
  'gulf-mobile': ['gulf-m.png', null, 600],
  'rivendell-home': ['rivendell-d.png'],
  'rivendell-mobile': ['rivendell-m.png', null, 600],
};

for (const [name, [file, crop, width = 1440]] of Object.entries(jobs)) {
  const input = path.join(src, file);
  if (!fs.existsSync(input)) { console.log('skip (missing)', file); continue; }
  let img = sharp(input);
  if (crop) img = img.extract(crop);
  const meta = await img.clone().metadata();
  await img.clone().resize({ width: Math.min(width, crop?.width ?? meta.width), withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(path.join(out, `${name}.webp`));
  if (width >= 1440) {
    await img.clone().resize({ width: 760 }).webp({ quality: 78 }).toFile(path.join(out, `${name}-sm.webp`));
  }
  console.log('ok', name);
}
