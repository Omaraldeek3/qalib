// Every typeface a design may use. Files come from the fontsource package of
// the same id (`@fontsource/<id>`) and are copied at build time, so a demo
// never asks another site for a font. Only the weights listed here ship.

export type FontKind = 'serif' | 'sans' | 'display' | 'mono' | 'script' | 'hand';

export type Font = {
  family: string;
  weights: number[];
  /** The weight headings use when this font sets them. */
  display: number;
  kind: FontKind;
  arabic?: true;
};

const f = (family: string, weights: number[], display: number, kind: FontKind, arabic?: true): Font =>
  ({ family, weights, display, kind, ...(arabic ? { arabic } : {}) });

export const FONTS: Record<string, Font> = {
  // Arabic (each also carries its own Latin letters and digits).
  'amiri': f('Amiri', [400, 700], 700, 'serif', true),
  'aref-ruqaa': f('Aref Ruqaa', [400, 700], 700, 'display', true),
  'reem-kufi': f('Reem Kufi', [400, 500, 700], 700, 'sans', true),
  'reem-kufi-fun': f('Reem Kufi Fun', [500, 700], 700, 'display', true),
  'el-messiri': f('El Messiri', [400, 500, 700], 700, 'sans', true),
  'cairo': f('Cairo', [400, 600, 800], 800, 'sans', true),
  'tajawal': f('Tajawal', [400, 500, 800], 800, 'sans', true),
  'almarai': f('Almarai', [400, 700, 800], 800, 'sans', true),
  'ibm-plex-sans-arabic': f('IBM Plex Sans Arabic', [400, 600, 700], 700, 'sans', true),
  'readex-pro': f('Readex Pro', [300, 400, 600], 600, 'sans', true),
  'noto-kufi-arabic': f('Noto Kufi Arabic', [400, 700, 800], 800, 'sans', true),
  'noto-naskh-arabic': f('Noto Naskh Arabic', [400, 600, 700], 700, 'serif', true),
  'lalezar': f('Lalezar', [400], 400, 'display', true),
  'rakkas': f('Rakkas', [400], 400, 'display', true),
  'marhey': f('Marhey', [500, 700], 700, 'display', true),
  'changa': f('Changa', [400, 600, 800], 800, 'sans', true),
  'mada': f('Mada', [300, 400, 600], 600, 'sans', true),
  'harmattan': f('Harmattan', [400, 700], 700, 'sans', true),
  'lateef': f('Lateef', [400, 700], 700, 'serif', true),
  'scheherazade-new': f('Scheherazade New', [400, 700], 700, 'serif', true),
  'markazi-text': f('Markazi Text', [400, 600, 700], 700, 'serif', true),
  'lemonada': f('Lemonada', [400, 700], 700, 'display', true),
  'baloo-bhaijaan-2': f('Baloo Bhaijaan 2', [400, 700, 800], 800, 'display', true),
  'katibeh': f('Katibeh', [400], 400, 'display', true),
  'jomhuria': f('Jomhuria', [400], 400, 'display', true),
  'mirza': f('Mirza', [400, 700], 700, 'serif', true),
  'kufam': f('Kufam', [400, 700, 800], 800, 'sans', true),
  'blaka': f('Blaka', [400], 400, 'display', true),
  'vibes': f('Vibes', [400], 400, 'hand', true),
  'qahiri': f('Qahiri', [400], 400, 'display', true),
  'alexandria': f('Alexandria', [300, 500, 800], 800, 'sans', true),
  'zain': f('Zain', [400, 700, 800], 800, 'sans', true),
  'handjet': f('Handjet', [400, 700], 700, 'display', true),
  'playpen-sans-arabic': f('Playpen Sans Arabic', [400, 600, 800], 800, 'hand', true),
  'vazirmatn': f('Vazirmatn', [400, 700], 700, 'sans', true),
  'noto-sans-arabic': f('Noto Sans Arabic', [400, 600, 800], 800, 'sans', true),
  'beiruti': f('Beiruti', [400, 700, 900], 900, 'sans', true),
  'badeen-display': f('Badeen Display', [400], 400, 'display', true),
  'fustat': f('Fustat', [400, 700], 700, 'sans', true),

  // Latin.
  'cormorant-garamond': f('Cormorant Garamond', [400, 500, 600, 700], 600, 'serif'),
  'cormorant': f('Cormorant', [400, 600, 700], 600, 'serif'),
  'playfair-display': f('Playfair Display', [400, 700, 900], 700, 'serif'),
  'playfair-display-sc': f('Playfair Display SC', [400, 700], 700, 'serif'),
  'libre-baskerville': f('Libre Baskerville', [400, 700], 700, 'serif'),
  'eb-garamond': f('EB Garamond', [400, 600], 600, 'serif'),
  'dm-serif-display': f('DM Serif Display', [400], 400, 'serif'),
  'bodoni-moda': f('Bodoni Moda', [400, 600, 800], 600, 'serif'),
  'cinzel': f('Cinzel', [400, 600, 700], 600, 'serif'),
  'cinzel-decorative': f('Cinzel Decorative', [400, 700], 700, 'display'),
  'abril-fatface': f('Abril Fatface', [400], 400, 'display'),
  'rye': f('Rye', [400], 400, 'display'),
  'special-elite': f('Special Elite', [400], 400, 'mono'),
  'old-standard-tt': f('Old Standard TT', [400, 700], 700, 'serif'),
  'im-fell-english': f('IM Fell English', [400], 400, 'serif'),
  'inter': f('Inter', [400, 500, 700], 700, 'sans'),
  'inter-tight': f('Inter Tight', [500, 700, 800], 700, 'sans'),
  'dm-sans': f('DM Sans', [400, 500, 700], 700, 'sans'),
  'manrope': f('Manrope', [400, 600, 800], 800, 'sans'),
  'space-grotesk': f('Space Grotesk', [400, 500, 700], 700, 'sans'),
  'syne': f('Syne', [500, 700, 800], 800, 'display'),
  'unbounded': f('Unbounded', [400, 700, 900], 700, 'display'),
  'archivo': f('Archivo', [400, 600, 800], 800, 'sans'),
  'archivo-black': f('Archivo Black', [400], 400, 'display'),
  'bebas-neue': f('Bebas Neue', [400], 400, 'display'),
  'anton': f('Anton', [400], 400, 'display'),
  'oswald': f('Oswald', [400, 600, 700], 700, 'sans'),
  'space-mono': f('Space Mono', [400, 700], 700, 'mono'),
  'jetbrains-mono': f('JetBrains Mono', [400, 700], 700, 'mono'),
  'ibm-plex-mono': f('IBM Plex Mono', [400, 600], 600, 'mono'),
  'vt323': f('VT323', [400], 400, 'mono'),
  'press-start-2p': f('Press Start 2P', [400], 400, 'display'),
  'silkscreen': f('Silkscreen', [400, 700], 700, 'display'),
  'orbitron': f('Orbitron', [500, 700, 900], 700, 'display'),
  'audiowide': f('Audiowide', [400], 400, 'display'),
  'monoton': f('Monoton', [400], 400, 'display'),
  'righteous': f('Righteous', [400], 400, 'display'),
  'bungee': f('Bungee', [400], 400, 'display'),
  'fredoka': f('Fredoka', [400, 600, 700], 700, 'display'),
  'baloo-2': f('Baloo 2', [400, 600, 800], 800, 'display'),
  'nunito': f('Nunito', [400, 700, 900], 900, 'sans'),
  'caveat': f('Caveat', [400, 700], 700, 'hand'),
  'patrick-hand': f('Patrick Hand', [400], 400, 'hand'),
  'kalam': f('Kalam', [400, 700], 700, 'hand'),
  'gloria-hallelujah': f('Gloria Hallelujah', [400], 400, 'hand'),
  'permanent-marker': f('Permanent Marker', [400], 400, 'hand'),
  'shrikhand': f('Shrikhand', [400], 400, 'display'),
  'poiret-one': f('Poiret One', [400], 400, 'display'),
  'limelight': f('Limelight', [400], 400, 'display'),
  'josefin-sans': f('Josefin Sans', [300, 400, 600, 700], 600, 'sans'),
  'marcellus': f('Marcellus', [400], 400, 'serif'),
  'marcellus-sc': f('Marcellus SC', [400], 400, 'serif'),
  'italiana': f('Italiana', [400], 400, 'serif'),
  'fraunces': f('Fraunces', [400, 600, 800], 600, 'serif'),
  'instrument-serif': f('Instrument Serif', [400], 400, 'serif'),
  'newsreader': f('Newsreader', [400, 600, 700], 700, 'serif'),
  'source-serif-4': f('Source Serif 4', [400, 600, 700], 700, 'serif'),
  'lora': f('Lora', [400, 600], 600, 'serif'),
  'work-sans': f('Work Sans', [400, 600, 800], 800, 'sans'),
  'outfit': f('Outfit', [300, 400, 600, 800], 600, 'sans'),
  'plus-jakarta-sans': f('Plus Jakarta Sans', [400, 600, 800], 800, 'sans'),
  'sora': f('Sora', [400, 600, 800], 600, 'sans'),
  'lexend': f('Lexend', [400, 600], 600, 'sans'),
  'chakra-petch': f('Chakra Petch', [400, 600, 700], 700, 'sans'),
  'rajdhani': f('Rajdhani', [500, 700], 700, 'sans'),
  'bricolage-grotesque': f('Bricolage Grotesque', [400, 600, 800], 800, 'sans'),
  'big-shoulders-display': f('Big Shoulders Display', [600, 800, 900], 900, 'display'),
  'libre-caslon-display': f('Libre Caslon Display', [400], 400, 'serif'),
  'libre-caslon-text': f('Libre Caslon Text', [400, 700], 700, 'serif'),
  'great-vibes': f('Great Vibes', [400], 400, 'script'),
  'pinyon-script': f('Pinyon Script', [400], 400, 'script'),
  'lilita-one': f('Lilita One', [400], 400, 'display'),
  'federo': f('Federo', [400], 400, 'display'),
  'young-serif': f('Young Serif', [400], 400, 'serif'),
  'urbanist': f('Urbanist', [400, 600, 800], 800, 'sans'),
  'figtree': f('Figtree', [400, 600, 800], 800, 'sans'),
  'ibm-plex-sans': f('IBM Plex Sans', [400, 600], 600, 'sans'),
  'unifrakturmaguntia': f('UnifrakturMaguntia', [400], 400, 'display'),
  'rubik-mono-one': f('Rubik Mono One', [400], 400, 'display'),
  'dela-gothic-one': f('Dela Gothic One', [400], 400, 'display'),
};

const generic: Record<FontKind, string> = {
  serif: 'serif', sans: 'sans-serif', display: 'sans-serif', mono: 'monospace', script: 'cursive', hand: 'cursive',
};

export function font(id: string): Font {
  const found = FONTS[id];
  if (!found) throw new Error(`Unknown font "${id}"`);
  return found;
}

/** A CSS font-family value: the named font, then a generic fallback. */
export function stack(...ids: (string | undefined)[]): string {
  const named = ids.filter((id): id is string => !!id).map(id => `"${font(id).family}"`);
  const last = ids.filter((id): id is string => !!id).at(-1);
  return [...named, last ? generic[font(last).kind] : 'sans-serif'].join(', ');
}
