import { PostTypePageProps } from "@/types";

export default async function BoardsPage({ params }: PostTypePageProps) {
  const { type } = await params;
  return <div>{type}</div>;
}
