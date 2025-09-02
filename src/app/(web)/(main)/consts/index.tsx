import { BookOpen, Church, MapPin, MessageCircle } from "lucide-react";

export const subRoutes = [
  {
    id: 1,
    icon: <BookOpen />,
    label: "예배안내",
    href: "/about/worship",
  },
  {
    id: 2,
    icon: <Church />,
    label: "교회소개",
    href: "/about",
  },
  {
    id: 3,
    icon: <MapPin />,
    label: "오시는길",
    href: "/about/location",
  },
  {
    id: 4,
    icon: <MessageCircle />,
    label: "소통방",
    href: "/boards/talk",
  },
];

export interface Route {
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
    href: "/chaples",
    subRoutes: [
      {
        title: "주일예배",
        href: "/chaples/sunday",
      },
      {
        title: "수요예배",
        href: "/chaples/wednesday",
      },
      {
        title: "금요기도회",
        href: "/chaples/friday",
      },
    ],
  },
  {
    title: "교육/양육",
    href: "/educations",
    subRoutes: [
      {
        title: "새가족훈련",
        href: "/educations",
      },
      {
        title: "제자훈련",
        href: "/educations/discipleship",
      },
      {
        title: "사역훈련",
        href: "/educations/ministry-training",
      },
      {
        title: "일상(사랑방)",
        href: "/educations/life-group",
      },
    ],
  },
  {
    title: "다음세대",
    href: "/generations",
    subRoutes: [
      {
        title: "유아유초등부",
        href: "/generations",
      },
      {
        title: "중고등부",
        href: "/generations/teenagers",
      },
      {
        title: "청년1부",
        href: "/generations/young-adults",
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
  {
    title: "자유게시판",
    href: "/boards",
    subRoutes: [
      {
        title: "소통방",
        href: "/boards/talk",
      },
      {
        title: "사진/갤러리",
        href: "/boards/gallery",
      },
      {
        title: "은혜 나눔터",
        href: "/boards/testimony",
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

export const locationCoordinate = {
  x: 37.05175,
  y: 127.0639,
};

export const churchInfo = {
  name: "큰숲교회",
  address: "경기도 평택시 장당동 123-45",
  phone: "031-665-2004",
  floor: "본당 2층",
};
