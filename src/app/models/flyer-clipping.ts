
export interface FlyerClipping {
  flyer_item_id: number;
  flyer_id: number;
  clipping_image_url: string;
  name: string;

  // Needed for display
  merchant?: string;
  merchant_logo?: string;
}
