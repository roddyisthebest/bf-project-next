import { PostType } from "@/enums";
import { createClient } from "@/lib/supabase/server";
import { PostView } from "@/types";
import { BoardsTable } from "@/components/custom/boards-table";
import { GalleryGrid } from "@/components/custom/gallery-grid";

type SearchParams = {
  title?: string;
  sort?: "newest" | "oldest";
  page?: string;
  pageSize?: string;
};

export default async function BoardPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<SearchParams>;
  params: Promise<{ type: PostType }>;
}) {
  const { type } = await params;
  const resolvedSearchParams = await searchParams;

  const title = (resolvedSearchParams?.title ?? "").trim();
  const sort = (
    resolvedSearchParams?.sort === "oldest" ? "oldest" : "newest"
  ) as "newest" | "oldest";

  const page = Math.max(1, Number(resolvedSearchParams?.page ?? "1")); // 1-based
  const pageSize = Math.min(
    100,
    Math.max(1, Number(resolvedSearchParams?.pageSize ?? "10"))
  );

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();

  // 현재 사용자 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase
    .from("posts")
    .select(
      `
      *,
      profiles:user_id (
        id,
        name,
        role
      )
    `,
      {
        count: "exact",
      }
    )
    .eq("type", type);

  if (title) {
    query = query.or(`title.ilike.%${title}%`);
  }

  query = query
    .order("created_at", { ascending: sort === "oldest" })
    .range(from, to);

  const { data, count, error } = await query;

  const rows = (data ?? []) as PostView[];
  console.log('Posts data:', rows);
  console.log('Query error:', error);
  const total = count ?? 0;

  if (error) {
    return (
      <div className="px-6 pb-6">
        <div className="flex min-h-64 items-center justify-center rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-red-600 font-semibold">
            ⚠️ 게시글을 불러오지 못했습니다.
          </p>
          {error?.message && (
            <p className="ml-2 text-red-600">{error.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      {type === "gallery" ? (
        <GalleryGrid
          initialRows={rows}
          total={total}
          initialQ={title}
          initialSort={sort}
          page={page}
          pageSize={pageSize}
          user={user}
        />
      ) : (
        <BoardsTable
          initialRows={rows}
          total={total}
          initialQ={title}
          initialSort={sort}
          page={page}
          pageSize={pageSize}
          user={user}
        />
      )}
    </div>
  );
}
