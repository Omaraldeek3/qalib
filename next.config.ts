import type { NextConfig } from 'next';

// React needs eval() in development only, for its debugging tools.
const dev = process.env.NODE_ENV === 'development';

// Everything is served from this site: fonts, photos, demos. Demos may only
// be framed by the library itself; library pages may not be framed at all.
const csp = (frameAncestors: string) =>
  `default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}; font-src 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors ${frameAncestors}; base-uri 'self'; form-action 'none'`;

const common = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    // When two rules set the same header, the later one wins.
    return [
      { source: '/:path*', headers: [...common, { key: 'Content-Security-Policy', value: csp("'none'") }] },
      { source: '/demos/:path*', headers: [...common, { key: 'Content-Security-Policy', value: csp("'self'") }] },
    ];
  },
};

export default nextConfig;
