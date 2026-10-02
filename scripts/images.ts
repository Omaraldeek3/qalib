// Downloads every photo the demo content uses from Lorem Picsum (Unsplash
// licence) and stores it as WebP in public/img. Run after adding photos.
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { PROFILES } from '../src/catalog/profiles';

const out = join(process.cwd(), 'public', 'img');
mkdirSync(out, { recursive: true });

const ids = new Set<number>();
const walk = (v: unknown) => {
  if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if ((k === 'img' || k === 'img2') && typeof x === 'number') ids.add(x);
      else if (k === 'imgs' && Array.isArray(x)) x.forEach(n => ids.add(n));
      else walk(x);
    }
  }
};
walk(PROFILES);

const todo = [...ids].filter(id => !existsSync(join(out, `${id}.webp`)));
console.log(`${ids.size} photos used, ${todo.length} to download`);

const one = async (id: number) => {
  const res = await fetch(`https://picsum.photos/id/${id}/1600/1067`, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Photo ${id}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 68, effort: 5 }).toFile(join(out, `${id}.webp`));
};

const queue = [...todo];
await Promise.all(Array.from({ length: 6 }, async () => {
  for (let id = queue.shift(); id !== undefined; id = queue.shift()) {
    try { await one(id); } catch (e) { console.error(String(e)); }
  }
}));
console.log('Done');
