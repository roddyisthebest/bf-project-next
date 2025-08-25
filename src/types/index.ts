import { PostType } from "@/enums";

export interface PostBody {
  title: string;
  content: string;
  thumbnail: string | null;
  type: PostType | null;
}

export interface PostView extends PostBody {
  id: number;
  user_id: number;
  created_at: number;
  updated_at: number;
}
