"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { PostView } from "@/types";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

type SortOrder = "newest" | "oldest";

const formatDate = (v: string | number | Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(v));

export function GalleryGrid({
  initialRows,
  total,
  initialQ,
  initialSort,
  page,
  pageSize,
  user,
}: {
  initialRows: PostView[];
  total: number;
  initialQ: string;
  initialSort: SortOrder;
  page: number; // 1-based
  pageSize: number;
  user: User | null;
}) {
  const rows = initialRows;
  const [title, setTitle] = React.useState(initialQ);
  const [sort, setSort] = React.useState<SortOrder>(initialSort);

  React.useEffect(() => {
    setTitle(initialQ);
  }, [initialQ]);

  React.useEffect(() => {
    setSort(initialSort);
  }, [initialSort]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const pushWithParams = (
    next: Partial<{
      title: string;
      sort: SortOrder;
      page: number;
      pageSize: number;
    }>
  ) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (next.title !== undefined) params.set("title", next.title);
    if (next.sort !== undefined) params.set("sort", next.sort);
    if (next.page !== undefined) params.set("page", String(next.page));
    if (next.pageSize !== undefined)
      params.set("pageSize", String(next.pageSize));
    if (!params.get("title")) params.delete("title");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onSearch = () => {
    pushWithParams({ title, sort, page: 1, pageSize });
  };

  const changeSort = (s: SortOrder) => {
    setSort(s);
    pushWithParams({ title, sort: s, page: 1, pageSize });
  };

  const changePageSize = (size: number) => {
    pushWithParams({ title, sort, page: 1, pageSize: size });
  };

  const goPrev = () =>
    page > 1 && pushWithParams({ title, sort, page: page - 1, pageSize });
  const goNext = () =>
    page < pageCount &&
    pushWithParams({ title, sort, page: page + 1, pageSize });

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="제목 검색… (엔터)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {sort === "newest" ? "최신순" : "오래된순"}{" "}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>정렬</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => changeSort("newest")}>
              최신순
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeSort("oldest")}>
              오래된순
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <Button asChild className="ml-2">
            <Link href="/boards/new">글쓰기</Link>
          </Button>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {rows.length ? (
          rows.map((post) => (
            <Link
              key={post.id}
              href={`/boards/${post.type}/${post.id}/detail`}
              className="group block"
            >
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Thumbnail */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm">이미지 없음</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{(post as any).profiles?.name || "익명"}</span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            게시글이 없습니다.
          </div>
        )}
      </div>

      {/* Footer: pagination */}
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="text-sm text-muted-foreground">
          <span className="max-sm:hidden">
            Page {page} / {pageCount} · Total {total.toLocaleString()}
          </span>
          <span className="sm:hidden">
            {page}/{pageCount} · {total.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 max-sm:hidden">
            <span className="text-sm">Rows:</span>
            <select
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
            >
              {[12, 24, 36, 48].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goPrev}
            disabled={page <= 1}
          >
            <span className="max-sm:hidden">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={page >= pageCount}
          >
            <span className="max-sm:hidden">Next</span>
            <span className="sm:hidden">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
