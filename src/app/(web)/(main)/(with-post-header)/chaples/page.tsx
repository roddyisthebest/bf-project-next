import { ChaplesTable } from "@/components/custom/chaples-table";
import { createClient } from "@/lib/supabase/server";
import { ChapleView } from "@/types";

type SearchParams = {
  title?: string;
  sort?: "newest" | "oldest";
  page?: string;
  pageSize?: string;
};

export default async function ChaplePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const title = (searchParams?.title ?? "").trim();
  const sort = (searchParams?.sort === "oldest" ? "oldest" : "newest") as
    | "newest"
    | "oldest";

  const page = Math.max(1, Number(searchParams?.page ?? "1")); // 1-based
  const pageSize = Math.min(
    100,
    Math.max(1, Number(searchParams?.pageSize ?? "10"))
  );

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();

  let query = supabase
    .from("chaples")
    .select("*", {
      count: "exact",
    })
    .or(`type.eq.sunday`);

  if (title) {
    query = query.or(`title.ilike.%${title}%`);
  }

  query = query
    .order("created_at", { ascending: sort === "oldest" })
    .range(from, to);

  const { data, count, error } = await query;

  const rows = (data ?? []) as ChapleView[];
  const total = count ?? 0;

  if (error) {
    return (
      <div className="px-6 pb-6">
        <div className="flex min-h-64 items-center justify-center rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-red-600 font-semibold">
            ⚠️ 설교 영상을 불러오지 못했습니다.
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
      <ChaplesTable
        initialRows={rows}
        total={total}
        initialQ={title}
        initialSort={sort}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}
