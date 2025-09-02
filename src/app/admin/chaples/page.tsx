import { ChaplesTable } from "@/components/custom/chaples-table";
import { createClient } from "@/lib/supabase/server";
import { ChapleView } from "@/types";

type SearchParams = {
  q?: string;
  sort?: "newest" | "oldest";
  page?: string; // 1-based
  pageSize?: string; // 10/20/30...
};

export default async function ChaplesPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = (params?.q ?? "").trim();
  const sort = (params?.sort === "oldest" ? "oldest" : "newest") as
    | "newest"
    | "oldest";
  const page = Math.max(1, Number(params?.page ?? "1")); // 1-based
  const pageSize = Math.min(
    100,
    Math.max(1, Number(params?.pageSize ?? "10"))
  );

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();

  let query = supabase.from("chaples").select("*", {
    count: "exact",
  });

  if (q) {
    query = query.or(`title.ilike.%${q}%,type.ilike.%${q}%`);
  }

  query = query
    .order("created_at", { ascending: sort === "oldest" })
    .range(from, to);

  const { data, count, error } = await query;

  if (error) {
    // 실패 시 빈 목록 전달 (필요시 에러 핸들링 UI)
    return (
      <div className="px-4 pb-4">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <p className="mt-4 text-sm text-red-600">
          Failed to load posts: {error.message}
        </p>
      </div>
    );
  }

  const rows = (data ?? []) as ChapleView[];
  const total = count ?? 0;

  return (
    <div className="px-4 pb-4">
      <h1 className="text-2xl font-semibold">Chaples</h1>
      <div className="flex flex-1 w-full">
        <ChaplesTable
          initialRows={rows}
          total={total}
          initialQ={q}
          initialSort={sort}
          page={page}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
