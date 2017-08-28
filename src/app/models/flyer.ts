
export interface Flyer {
  id: number;
  flyer_run_id: number;
  flyer_type_id: number;
  postal_code: string;
  locale: string;
  path: string;
  width: number;
  height: number;
  merchant: string;
  merchant_id: number;
  merchant_logo: string;
  thumbnail_url: string;
  premium_thumbnail_url: string;
  valid_from: string;
  valid_to: string;
  available_from: string;
  available_to: string;
}
