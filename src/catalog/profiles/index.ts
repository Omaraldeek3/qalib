import type { Profile, ProfileId } from '../types';
import { academy, gym, hotel } from './places';
import { agency, clinic, construction, law, realestate, signage, software } from './business';
import { app, conference, photographer, wedding } from './people';
import { boutique, perfume } from './shops';
import { cafe, farm, restaurant, sweets } from './food';

export const PROFILES: Record<ProfileId, Profile> = {
  restaurant, cafe, sweets, farm, construction, agency, software, clinic, perfume, boutique,
  photographer, app, wedding, conference, signage, hotel, academy, gym, realestate, law,
};

export const profileIds = Object.keys(PROFILES) as ProfileId[];

export function profile(id: ProfileId): Profile {
  const found = PROFILES[id];
  if (!found) throw new Error(`Unknown profile "${id}"`);
  return found;
}
