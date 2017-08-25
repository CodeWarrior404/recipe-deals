import { Flyer } from './flyer';

export interface Ingredient {
  name: string;
  cat: string;
  canonical_category: string;
  base_name: string;
  icon_url: string;
  icon_asset_name: string;
  is_clean: boolean;
  priority_rank: number

  flyers?: Flyer[];
}
