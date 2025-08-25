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

type SortOrder = "newest" | "oldest";

const formatDate = (v: string | number | Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(v));

export function PostsTable({
  initialRows,
  total,
  initialQ,
  initialSort,
  page,
  pageSize,
}: {
  initialRows: PostView[];
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

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="제목/유형 검색… (엔터)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
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

        <Button asChild className="ml-2">
          <Link href="/admin/posts/new">Create</Link>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]">#</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[140px]">유형</TableHead>
              <TableHead className="w-[180px]">작성일</TableHead>
              <TableHead className="w-[180px]">수정일</TableHead>
              <TableHead className="w-[120px]">열람</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {r.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.thumbnail}
                          alt=""
                          className="h-9 w-9 rounded border object-cover"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded border bg-muted/40" />
                      )}
                      <span className="font-medium">{r.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="uppercase text-xs tracking-wide">
                      {r.type ?? "-"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(r.created_at)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(r.updated_at)}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/posts/${r.id}/detail`}>보기</Link>
                    </Button>
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

      {/* Footer: pagination */}
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {page} / {pageCount} · Total {total.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
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

          <Button
            variant="outline"
            size="sm"
            onClick={goPrev}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={page >= pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
