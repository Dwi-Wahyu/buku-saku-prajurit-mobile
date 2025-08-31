export interface Berita {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  judul: string;
  thumbnail: string;
  penulis: string;
  content: string;
  like: number;
  dislike: number;
}
