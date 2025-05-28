export interface Image {
  id: number;
  photo: string;
  object_id: number;
  content_type: number;
  created: Date;
}

export interface ImageList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Image[];
}
