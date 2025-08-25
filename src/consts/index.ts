import { ChapleBody, PostBody } from "@/types";

export const defaultPostBody: PostBody = {
  title: "",
  content: "",
  type: null,
  thumbnail: null,
};

export const defaultChaple: ChapleBody = {
  type: null,
  link: "",
  title: "",
  verse: "",
};

export const BUCKET = "image-bucket";
