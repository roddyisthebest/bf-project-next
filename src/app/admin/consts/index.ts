import { Church, Home, NotebookPen, ArrowLeft } from "lucide-react";

export const adminRoutes = [
  {
    title: "메인 사이트로",
    url: "/",
    icon: ArrowLeft,
  },
  {
    title: "Admin Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: NotebookPen,
  },
  {
    title: "Chaples",
    url: "/admin/chaples",
    icon: Church,
  },
];
