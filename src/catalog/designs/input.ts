import type { Design } from '../types';

/** A design as written in its style's file; the style and number are added by the index. */
export type DesignInput = Omit<Design, 'no' | 'cat'>;
