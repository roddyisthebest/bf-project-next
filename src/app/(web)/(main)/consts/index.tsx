import {
  BookOpen,
  Church,
  Compass,
  Heart,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";

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
    label: "은혜나눔터",
    href: "/boards/testimony",
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
        title: "교회연혁",
        href: "/about/history",
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
      {
        title: "주보",
        href: "/chaples/weekly",
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
        title: "사진/갤러리",
        href: "/boards/gallery",
      },
      {
        title: "은혜 나눔터",
        href: "/boards/testimony",
      },
      {
        title: "찬양",
        href: "/boards/music",
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
    content: "수요일 오후 07:30",
  },
  {
    title: "금요기도회",
    content: "금요일 오후 09:00",
  },
  {
    title: "새벽기도회",
    content: "월-목 오전 05:00",
  },
  // {
  //   title: "청년부 모임",
  //   content: "주일 오후 1:00",
  // },
];

export const locationCoordinate = {
  x: 37.05175,
  y: 127.0639,
};

export const churchInfo = {
  name: "큰숲교회",
  address: "경기도 평택시 장당길 59(장당동)",
  phone: "031-665-2004",
  floor: "본당 2층",
};

export const churchMeaning = [
  {
    title: "큰",
    description: [
      "하나님의 은혜와 사랑이 너무 크고",
      "우리를 향한 주님의 비전이 너무 커서…",
    ],
  },
  {
    title: "숲",
    description: [
      "그 누구나 회복과 쉼을 누리고,",
      "민족과 세대와 열방 가운데 산소 같은 교회..",
    ],
  },
];

export const churchVision = [
  { title: "전도", desc: "사람들을 그리스도께로 인도하고", icon: Heart },
  { title: "훈련", desc: "주님을 만나고 닮아가도록 양육하며", icon: BookOpen },
  { title: "사역", desc: "주님의 교회에서 헌신하고", icon: Users },
  { title: "선교", desc: "세상과 열방의 빛으로 나아가", icon: Compass },
  { title: "예배", desc: "주님께만 영광을 올려드리는", icon: Church },
];

export const churchFeatures = [
  {
    title: "생명있는 예배",
    image: "/feature_01.png",
    content: [
      "건강한 그리스도인들의 살아있는 예배",
      "하나님의 임재를 경험하는 예배",
      "큰숲의 예배는 언제나 살아있습니다.",
    ],
  },
  {
    title: "사랑이 넘치는 교제",
    image: "/feature_02.png",
    content: [
      "사랑방을 통한 성도들의 건강한 교제,",
      "말씀을 나누고 행복을 나누는 교제,",
      "행복이 넘치는 행복발전소입니다.",
    ],
  },
  {
    title: "변화가 있는 훈련",
    image: "/feature_03.png",
    content: [
      "새가족반, 성장반, 제자훈련, 사역훈련 등",
      "철저히 훈련하고 교육하는 교회,",
      "평신도를 깨우고 평신도가 세워가는 교회",
    ],
  },
  {
    title: "신바람나는 봉사",
    image: "/feature_04.png",
    content: [
      "소년소녀 가정들의 꿈을 심는 꿈나누기",
      "하나님과 사람을 섬기는 주님의 나무가 되어",
      "회복과 쉼을 위한 큰숲이 되어 드립니다.",
    ],
  },
  {
    title: "땅끝까지 나아가는 선교",
    image: "/feature_05.png",
    content: [
      "한 사람의 영혼을 소중히 여기는 교회,",
      "한국을 베이스캠프로 삼아",
      "민족과 열방을 섬기는 '바로 그 교회'입니다.",
    ],
  },
];

export const domesticMissions = [
  {
    id: 1,
    name: "장혜림",
    country: "대한민국",
    countryFlag: "🇰🇷",
    image: "/domestic_1.png",
  },
  {
    id: 2,
    name: "배지민",
    country: "대한민국",
    countryFlag: "🇰🇷",
    image: "/domestic_2.png",
  },
  {
    id: 3,
    name: "호세 엔마뉴엘",
    country: "엘살바도르",
    countryFlag: "🇸🇻",
    image: "/overseas_1.png",
  },
  {
    id: 4,
    name: "사뚜르쉬카",
    country: "스리랑카",
    countryFlag: "🇱🇰",
    image: "/overseas_2.png",
  },
];

export const internationalMissions = [
  {
    id: 1,
    name: "이성호/이현재, 준철, 주영",
    country: "미얀마",
    countryFlag: "🇲🇲",
    description: "유치원, 학원사역",
    activities: ["선교지 회복, 안정"],
    images: ["/miyanma.jpg"],
  },
  {
    id: 2,
    name: "이경곤/최순옥, 수민",
    country: "캄보디아",
    countryFlag: "🇰🇭",
    description: "2곳의 교회 사역, 사회복지센터",
    activities: ["오르세이센터", "교회개척: 쁘레아멀루 교회"],
    images: ["/cambodia.jpg"],
  },
  {
    id: 3,
    name: "이은옥/노수빌, 빅토, 글로리아, 다니엘",
    country: "인도 꼴카타",
    countryFlag: "🇮🇳",
    description: "유치원-대학교, 교회개척. 무료병원운영",
    activities: ["키즈클럽 (어린이전도, 제자훈련)"],
    images: ["/india.jpg"],
  },
  {
    id: 4,
    name: "박준호/도현정, 시언, 하언",
    country: "인도네시아",
    countryFlag: "🇮🇩",
    description: "보배유치원, 아가페 교회",
    activities: ["사역과 선교 활성화"],
    images: ["/indonesia1.jpg", "/indonesia2.jpg"],
  },
  {
    id: 5,
    name: "이선일/임희선, 호세, 호민",
    country: "태국",
    countryFlag: "🇹🇭",
    description: "청소년 학원사역, 현지교회, 미전도종족 ",
    activities: ["청소년 사역", "제자 훈련"],
    images: ["/thailand.jpg"],
  },
  {
    id: 6,
    name: "정몽률/이승희, 세은,세훈",
    country: "남아공",
    countryFlag: "🇿🇦",
    description: "교회세우기, 청년, 가정 세우기",
    activities: ["데일리 브레드 교회", "사회복지사역"],
    images: ["/southafrica.jpg"],
  },
  {
    id: 7,
    name: "강한종/고현정, 진주",
    country: "중국",
    countryFlag: "🇨🇳",
    description: "천안/아산 내 전도, 평신도선교훈련",
    activities: ["중국인 교회 설립"],
  },
  {
    id: 8,
    name: "정기수/김선화, 하늘, 승리",
    country: "미얀마",
    countryFlag: "🇲🇲",
    description: "전도, 청년제자훈련",
    activities: ["독수리학당", "제자훈련"],
    images: ["/miyanma2.jpg"],
  },
  {
    id: 9,
    name: "안광희/이은혜, 병호, 근호 (벧엘선교회)",
    country: "공통",
    countryFlag: "🌐",
    description: "외국인 이주 노동자 사역",
    activities: ["LMTC", "노동자 쉼터", "재교육 사역"],
    images: ["/worker.jpg"],
  },
];
