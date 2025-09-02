import { ChapleType, PostType, UserRole } from "@/enums";

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

export interface ChapleView extends ChapleBody {
  id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface ChapleBody {
  type: ChapleType | null;
  link: string;
  title: string;
  verse: string;
}

export type PageProps = {
  params: Promise<{ id: string }>;
};

export type PostTypePageProps = {
  params: Promise<{ type: PostType }>;
};

export interface Profile {
  id: string;
  role: UserRole;
  name?: string;
}
