import { PostsTable } from "@/components/custom/posts-table";
import { StereosTable } from "@/components/custom/stereos-table";

export default function PostsPage() {
  return (
    <div className="px-4 pb-4">
      <h1 className="text-2xl font-semibold mb-2">Posts</h1>
      <p className="text-gray-600">This is the Posts page.</p>
      <div className="flex flex-1 w-full">
        <PostsTable />
      </div>

      {/* Add more content or components as needed */}
    </div>
  );
}
