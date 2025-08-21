"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type RectangleButtonProps = {
  icon?: ReactNode;
  label: string;
  href: string;
  className?: string;
};

export default function RectangleButton({
  icon,
  label,
  href,
  className = "",
}: RectangleButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "group relative flex h-18 items-center gap-x-2 px-4",
        "text-primary cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      ].join(" ")}
    >
      {icon}
      <h3 className="font-bold">{label}</h3>

      {/* 오른쪽 사이드 프레임 + 화살표 */}
      <span
        aria-hidden
        className="
          absolute right-0 top-1/2 -translate-y-1/2
          border-y border-l border-brand-100 rounded-l-md
          p-1 text-primary transition-colors
          group-hover:bg-primary group-hover:text-white
          pointer-events-none
        "
      >
        <ChevronRight size={20} />
      </span>
    </Link>
  );
}
