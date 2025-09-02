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
import { ChapleView, PostView } from "@/types";

type SortOrder = "newest" | "oldest";

const formatDate = (v: string | number | Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(v));

export function ChaplesTable({
  initialRows,
  total,
  initialQ,
  initialSort,
  page,
  pageSize,
}: {
  initialRows: ChapleView[];
  total: number;
  initialQ: string;
  initialSort: SortOrder;
  page: number; // 1-based
  pageSize: number;
}) {
  const rows = initialRows;
  const [q, setQ] = React.useState(initialQ);
  const [sort, setSort] = React.useState<SortOrder>(initialSort);

  React.useEffect(() => {
    setQ(initialQ);
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
      q: string;
      sort: SortOrder;
      page: number;
      pageSize: number;
    }>
  ) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (next.q !== undefined) params.set("q", next.q);
    if (next.sort !== undefined) params.set("sort", next.sort);
    if (next.page !== undefined) params.set("page", String(next.page));
    if (next.pageSize !== undefined)
      params.set("pageSize", String(next.pageSize));
    // 보장: 비어있는 q 제거
    if (!params.get("q")) params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onSearch = () => {
    // 검색 시 1페이지로
    pushWithParams({ q, sort, page: 1, pageSize });
  };

  const changeSort = (s: SortOrder) => {
    setSort(s);
    pushWithParams({ q, sort: s, page: 1, pageSize });
  };

  const changePageSize = (size: number) => {
    pushWithParams({ q, sort, page: 1, pageSize: size });
  };

  const goPrev = () =>
    page > 1 && pushWithParams({ q, sort, page: page - 1, pageSize });
  const goNext = () =>
    page < pageCount && pushWithParams({ q, sort, page: page + 1, pageSize });

  const getDetailPath = (chaple: ChapleView) =>
    isAdmin
      ? `/admin/chaples/${chaple.id}/edit`
      : `/chaples/${chaple.type}/${chaple.id}/detail`;

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 py-4">
        {/* <Input
          placeholder="제목/유형 검색… (엔터)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="max-w-sm"
        /> */}

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

        {isAdmin && (
          <Button asChild className="ml-2">
            <Link href="/admin/chaples/new">Create</Link>
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        {/* 스크롤 가능 컨테이너 */}
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader className="bg-primary-50">
              <TableRow>
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead className="min-w-[120px] truncate">제목</TableHead>
                <TableHead>유형</TableHead>
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
                    <TableCell className="text-muted-foreground">
                      {formatDate(r.created_at)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
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
