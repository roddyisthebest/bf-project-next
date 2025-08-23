import { BookOpen } from "lucide-react";

export const subRoutes = [
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
  {
    id: 3,
    icon: <BookOpen />,
    label: "교회소개",
    href: "/about/worship",
  },
  {
    id: 4,
    icon: <BookOpen />,
    label: "교회소개",
    href: "/about/worship",
  },
];

interface Route {
  title: string;
  href: string;
  subRoutes?: Route[];
}

export const routes: Route[] = [
  {
    title: "교회소개",
    href: "/about",
    subRoutes: [
      {
        title: "인사말",
        href: "/about",
      },
      {
        title: "예배안내",
        href: "/about/worship",
      },
      {
        title: "오시는길",
        href: "/about/location",
      },
    ],
  },
  {
    title: "예배",
    href: "/chaple",
    subRoutes: [
      {
        title: "주일예배",
        href: "/chaple",
      },
      {
        title: "수요예배",
        href: "/chaple/wednesday",
      },
      {
        title: "금요기도회",
        href: "/chaple/friday",
      },
    ],
  },
  {
    title: "교육/양육",
    href: "/education",
    subRoutes: [
      {
        title: "새가족반",
        href: "/education",
      },
      {
        title: "제자반",
        href: "/education/discipleship",
      },
    ],
  },
  {
    title: "다음세대",
    href: "/generation",
    subRoutes: [
      {
        title: "유아유초등부",
        href: "/generation",
      },
      {
        title: "중고등부",
        href: "/generation/teenagers",
      },
      {
        title: "청년1부",
        href: "/generation/young-adults",
      },

      {
        title: "장년부",
        href: "/generation/adults",
      },
    ],
  },
  {
    title: "선교",
    href: "/missions",
    subRoutes: [
      {
        title: "국내선교",
        href: "/missions",
      },
      {
        title: "해외선교",
        href: "/missions/international",
      },
    ],
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
