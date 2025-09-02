"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

type SortOrder = "newest" | "oldest";

const formatDate = (v: string | number | Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(v));

export function BoardsTable({
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
  const isAdmin = pathname?.startsWith("/admin") ?? false;

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
    // 보장: 비어있는 title 제거
    if (!params.get("title")) params.delete("title");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onSearch = () => {
    // 검색 시 1페이지로
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
    page < pageCount && pushWithParams({ title, sort, page: page + 1, pageSize });

  const getDetailPath = (post: PostView) =>
    isAdmin
      ? `/admin/boards/${post.id}/edit`
      : `/boards/${post.type}/${post.id}/detail`;

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
            <Link href="/boards/new">
              글쓰기
            </Link>
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader className="bg-primary-50">
              <TableRow>
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead className="min-w-[120px] truncate">제목</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>작성일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length ? (
                rows.map((r) => (
                  <TableRow
                    key={r.id}
                    onClick={() => router.push(getDetailPath(r))}
                    role="link"
                    tabIndex={0}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>{r.id}</TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      <span className="font-medium">{r.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className="uppercase text-xs tracking-wide">
                        {r.type ?? "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {(r as any).profiles?.name || r.user_id?.slice(0, 8) + '...' || "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(r.created_at)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer: pagination */}
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="text-sm text-muted-foreground">
          <span className="max-sm:hidden">Page {page} / {pageCount} · Total {total.toLocaleString()}</span>
          <span className="sm:hidden">{page}/{pageCount} · {total.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 max-sm:hidden">
            <span className="text-sm">Rows:</span>
            <select
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 50, 100].map((s) => (
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