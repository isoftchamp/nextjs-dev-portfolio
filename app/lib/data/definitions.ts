import { StaticImageData } from "next/image";

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  tools: string[];
  role: string;
  code: string;
  demo: string;
  image: StaticImageData;
  url: string;
};

export type BlogType = {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  public_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
}

export type DictionaryType = {
  [key: string]: string;
}

export type ServerResType = {
  success: boolean;
  message: string | null 
}