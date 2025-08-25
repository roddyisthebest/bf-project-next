import { Church, Home, NotebookPen } from "lucide-react";

export const adminRoutes = [
  {
    title: "Home",
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
