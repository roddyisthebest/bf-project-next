import { BookOpen } from "lucide-react";

export const routes = [
  {
    id: 1,
    icon: <BookOpen />,
    label: "예배안내",
    href: "/about/worship",
  },
  {
    id: 2,
    icon: <BookOpen />,
    label: "교회소개",
    href: "/about/worship",
  },
];

// TODO: 추후에 서버서 관리 가능할듯
export const timeTable = [
  {
    title: "주일예배",
    content: "주일 오전 09:00, 11:00",
  },
  {
    title: "수요예배",
    content: "수요일 오후 08:00",
  },
  {
    title: "금요기도회",
    content: "금요일 오후 09:00",
  },
  {
    title: "새벽기도회",
    content: "월-목 오전 05:30",
  },
];
