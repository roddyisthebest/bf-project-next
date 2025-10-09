import { Church, Home, NotebookPen, ArrowLeft } from "lucide-react";

export const adminRoutes = [
  {
    title: "메인 사이트로",
    url: "/",
    icon: ArrowLeft,
  },
  {
    title: "관리자 홈",
    url: "/admin",
    icon: Home,
  },
  {
    title: "게시글 관리",
    url: "/admin/posts",
    icon: NotebookPen,
  },
  {
    title: "예배 관리",
    url: "/admin/chaples",
    icon: Church,
  },
];
