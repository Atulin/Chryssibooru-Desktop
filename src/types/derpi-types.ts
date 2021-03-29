/* eslint-disable camelcase */
export interface Intensities {
  ne: number;
  nw: number;
  se: number;
  sw: number;
}

export interface Representations {
  full: string;
  large: string;
  medium: string;
  small: string;
  tall: string;
  thumb: string;
  thumb_small: string;
  thumb_tiny: string;
}

export interface DerpiImage {
  id: number;
  description: string;
  view_url: string;
  representations: Representations;
  name: string;
  thumbnails_generated: boolean;
  animated: boolean;
  uploader: string;
  format: string;
  aspect_ratio: number;
  score: number;
  upvotes: number;
  downvotes: number;
  created_at: Date;
  updated_at: Date;
  uploader_id: number;
  intensities: Intensities;
  faves: number;
  first_seen_at: Date;
  mime_type: 'image/png' | 'image/jpg' | 'video/webm' | 'video/mp4';
  tag_count: number;
  width: number;
  height: number;
  size: number;
  spoilered: boolean;
  tag_ids: number[];
  tags: string[];
  processed: boolean;
  comment_count: number;
  hidden_from_users: boolean;
  sha512_hash: string;
  orig_sha512_hash: string;
  wilson_score: number;
  duration: number;
}

export interface PhilomenaResponse {
  images: Set<DerpiImage>;
  interactions: string[];
  total: number;
}
