import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Church,
  Zap,
  RefreshCw,
  Heart,
  Target,
  Shield,
  Sparkles,
  Crown,
  Compass,
  HandHeart,
  BookOpen,
  Smile,
  RotateCcw,
  Gift,
  Users2,
} from "lucide-react";

const churchHistory = [
  {
    year: "2006",
    events: [
      {
        date: "4. 19",
        description: "큰숲교회 설립(안성시 원곡면 칠곡리 423-1)",
      },
      { date: "11. 16", description: "기공예배(평택시 장당동 641-8)" },
    ],
  },
  {
    year: "2007",
    events: [
      { date: "1. 7", description: "큰숲교회 공동의회, 제직회 조직" },
      { date: "4. 14", description: "입당예배(예장총회 함남노회)" },
      { date: "10.22-11.11", description: "다니엘 특새<요한복음>" },
    ],
  },
  {
    year: "2008",
    events: [
      { date: "1. 6", description: "큰숲교회 운영위원회 조직" },
      { date: "3. 2", description: "큰숲 아카데미 과정 시작" },
      {
        date: "9. 7",
        description: "지역복지과 연계 도시락반찬사역(11년마무리)",
      },
      { date: "9.22-10.31", description: "목적이 이끌어가는 40일 특새" },
    ],
  },
  {
    year: "2009",
    events: [
      { date: "2. 15", description: "예수사관학교 과정 시작" },
      { date: "3. 22", description: "비전홈스쿨(주말대안학교) 시작" },
      { date: "7월", description: "중고등부 연합캠프사역(GLB) 시작" },
      { date: "9.9-11", description: "성막부흥회(백창곤 목사:한기연)" },
      { date: "9. 26", description: "임직예배(안수집사 3, 권사 4)" },
      { date: "11.15", description: "추수감사절- 꾸러기축제 시작" },
    ],
  },
  {
    year: "2010",
    events: [
      { date: "3.7-11.21", description: "크로스웨이 1단계 과정 수료" },
      { date: "6.1-7.13", description: "이슬비장학회 303비전 유니게1단계" },
      { date: "9.27-11.5", description: "공동체를 세우는 40일 특새" },
      { date: "12. 19", description: "이동환 목사 부임(11.12.25 사임)" },
    ],
  },
  {
    year: "2011",
    events: [
      { date: "2.16-18", description: "선교부흥회(윤순덕 목사:선교대구)" },
      { date: "3. 13", description: "홍수환 집사 초청 간증집회" },
      { date: "9.6-10.25", description: "이슬비장학회 303비전 유니게2단계" },
      { date: "10.17-11.4", description: "다니엘 특새<기도가 희망입니다>" },
    ],
  },
  {
    year: "2012",
    events: [
      { date: "12. 25", description: "박동복 전도사 부임(13.11.17 사임)" },
      { date: "2.3-5", description: "다윗과 요나단 초청 찬양부흥회" },
      { date: "10.7-13.8.10", description: "다윗장막에서 예배 드림" },
      { date: "10.8-11.16", description: "성경의 기도 40일 특새" },
    ],
  },
  {
    year: "2013",
    events: [
      { date: "10.14-11.1", description: "다니엘 특새 <성령>" },
      { date: "12. 8", description: "정기수 전도사 부임(16.10.30 사임)" },
    ],
  },
  {
    year: "2014",
    events: [
      { date: "2.19-20", description: "말씀영성 세미나(정몽률 목사)" },
      { date: "4.26", description: "임직예배(안수집사 1, 권사 3)" },
      { date: "5.6월", description: "청장년부 세대별 하루캠프" },
      { date: "10.6-11.7", description: "33일 특새<진리의 길, 로마서>" },
    ],
  },
  {
    year: "2015",
    events: [
      { date: "1.25-31", description: "캄보디아 단기선교(14인)" },
      { date: "10.12-30", description: "다니엘 특새<십자가의 도>" },
      { date: "11.15", description: "날날날 감사축제(한창수 목사, 추수감사)" },
    ],
  },
  {
    year: "2016",
    events: [
      { date: "2.24-26", description: "설립10주년 말씀성회(김지찬교수)" },
      { date: "10.10-11.4", description: "가을 특새<돌아봐 돌아와/느헤미야>" },
    ],
  },
  {
    year: "2017",
    events: [
      { date: "1.15-21", description: "인도네시아 단기선교(16인)" },
      { date: "10.16-11.3", description: "다니엘 특새<부르심-사명>" },
    ],
  },
  {
    year: "2018",
    events: [
      { date: "4.13-15", description: "말씀사경회(임재택 목사;애드먼툰장로)" },
      { date: "9.3-14,10.15-11.2", description: "가을 30특새<매일성경 본문>" },
      { date: "11.3", description: "와보라 데이(전도축제)" },
      { date: "11.18", description: "포디움과 함께 하는 가을음악회" },
    ],
  },
  {
    year: "2019",
    events: [
      { date: "1.20-26", description: "태국 나콘빠콤 단기선교(10인)" },
      { date: "4,5,6월", description: "태양광 설비(태양광전기사업 : 푸른숲)" },
      { date: "8.31", description: "큰숲 전교인 한마음 운동회(은혜중 체육관)" },
      { date: "10.14-11.1", description: "다니엘 특새(꿈을 향해 걸어가)" },
      { date: "11.2", description: "와보라 데이(전도축제)" },
    ],
  },
  {
    year: "2020",
    events: [
      { date: "1.19", description: "경원시찰 연합제직세미나(강사 : 장의겸)" },
      { date: "3월", description: "신종코로나 19 광야여정" },
      { date: "3.1-4.5", description: "온라인예배 4.11 부활절 –현장예배 다시" },
      {
        date: "10.5-11.13",
        description: "40일 주님동행(성경읽기방)<동행과 성경>",
      },
    ],
  },
  {
    year: "2021",
    events: [
      { date: "1. 31", description: "주일 현장예배 재개" },
      { date: "3.28", description: "유아유치부, 유초등부 현장예배 재개" },
      { date: "11.1-19", description: "다니엘 특새<크리스천 기본기>" },
      { date: "4월", description: "예수님의 사람 제자훈련 시작" },
    ],
  },
  {
    year: "2022",
    events: [
      {
        date: "5. 1",
        description: "주일 사랑방, 중고등부, 청년부 현장모임 재개",
      },
      { date: "7월", description: "청년부 캠프, 중고등부 GLB 재개" },
      {
        date: "10.17-11.4",
        description: "다니엘 특새<슬기로운 신앙생활-매일성경>",
      },
      { date: "11.5", description: "와보라데이(전도축제) 재개" },
    ],
  },
  {
    year: "2023",
    events: [
      { date: "2.22-24", description: "말씀사경회(장의겸 목사:회정교회 협동)" },
      { date: "4.16", description: "임직예배(안수집사 2, 권사 7)" },
      { date: "5.14", description: "꾸러기 축제 재개" },
      { date: "8월", description: "3080 썸머스쿨(장년부 여름성경학교)" },
      {
        date: "10.23-11.10",
        description: "다니엘 특새<주며들다-주님께로 스며들다>",
      },
    ],
  },
  {
    year: "2024",
    events: [
      { date: "5-6월, 10-11월", description: "큐티나모 진행" },
      { date: "6.16", description: "최용덕 간사 간증 찬양집회" },
      { date: "8.18", description: "장년부 썸머스쿨(원데이 캠프)" },
      {
        date: "10.14-11.1",
        description: "다니엘 특새<너희는 이렇게 기도하라>",
      },
      { date: "11.17", description: "와보라음악회(2번째 ; 새생명, 큰숲가족)" },
    ],
  },
  {
    year: "2025",
    events: [
      { date: "2.10-12.31", description: "생수의 강 기도회" },
      { date: "9.11-", description: "교회 리모델링" },
    ],
  },
];

const yearlyThemes = [
  {
    year: "2006-2007",
    theme: "정석교회 해법목회",
    subtitle: "교회 기초 세우기",
    icon: Church,
  },
  {
    year: "2008",
    theme: "열정",
    subtitle: "능력있는 삶 - 크게 생각하고 열정으로 살라",
    icon: Zap,
  },
  {
    year: "2009",
    theme: "변화",
    subtitle: "성장과 성숙 - 닦고 조이고 기름치자",
    icon: RefreshCw,
  },
  {
    year: "2010",
    theme: "사랑",
    subtitle: "용서와 사랑 - 제가 먼저 사랑할래요",
    icon: Heart,
  },
  {
    year: "2011",
    theme: "도전",
    subtitle: "새로운 도전 - 예수로 도전하고 생명으로 도약하라",
    icon: Target,
  },
  {
    year: "2012",
    theme: "건강",
    subtitle: "균형잡힌 삶 - 건강한 신앙으로 강건한 삶 UP",
    icon: Shield,
  },
  {
    year: "2013",
    theme: "생기",
    subtitle: "활력있는 삶 - 생기! 살아내고 살려내고",
    icon: Sparkles,
  },
  {
    year: "2014",
    theme: "먼저",
    subtitle: "삶의 우선순위 - 먼저 그의 나라와 그 의를 구하라",
    icon: Crown,
  },
  {
    year: "2015",
    theme: "섬김",
    subtitle: "섬김의 삶 - 너희도 서로 발을 씻어주는 것이 옳으니라",
    icon: HandHeart,
  },
  {
    year: "2016",
    theme: "설렘",
    subtitle: "초심으로 - 은혜의 설렘으로, 헌신의 초심으로",
    icon: Smile,
  },
  {
    year: "2017",
    theme: "감사",
    subtitle: "감사의 삶 - 감사! 고백합니다. 예배합니다",
    icon: Heart,
  },
  {
    year: "2018",
    theme: "존중",
    subtitle: "예배자 - 예배를 예배되게 교회를 교회되게",
    icon: Church,
  },
  {
    year: "2019",
    theme: "곁에",
    subtitle: "성도의 교제 - 당신 곁에, 주님 곁으로",
    icon: Users2,
  },
  {
    year: "2020",
    theme: "더북",
    subtitle: "성경 - 성경 속에서 하나님을 만나다",
    icon: BookOpen,
  },
  {
    year: "2021",
    theme: "격려",
    subtitle: "토닥토닥 - 서로 돌아보아 사랑과 선행을 격려하며",
    icon: Heart,
  },
  {
    year: "2022",
    theme: "습관",
    subtitle: "좋은 습관으로 삶을 새롭게",
    icon: RotateCcw,
  },
  {
    year: "2023",
    theme: "드림",
    subtitle: "헌신 - 드림(헌신)이 드림(꿈)입니다",
    icon: Gift,
  },
  {
    year: "2024",
    theme: "사귐",
    subtitle: "따름을 넘어 사귐으로, 눌림이 아닌 누림으로",
    icon: Users,
  },
  {
    year: "2025",
    theme: "기도",
    subtitle: "쉬지 말고 기도하라; 일상, 합심, 따로 기도",
    icon: Heart,
  },
];

const milestones = [
  {
    icon: Church,
    title: "교회 설립",
    year: "2006년",
    description: "안성시 원곡면에서 큰숲교회가 설립되었습니다.",
  },
  {
    icon: MapPin,
    title: "입당예배",
    year: "2007년",
    description: "평택시 장당동 현재 위치에서 입당예배를 드렸습니다.",
  },
  {
    icon: Users,
    title: "사역 확장",
    year: "2009-2015년",
    description: "다양한 부서와 선교사역이 시작되고 확장되었습니다.",
  },
  {
    icon: Calendar,
    title: "현재",
    year: "2024년",
    description: "지역사회와 함께하는 교회로 성장하고 있습니다.",
  },
];

export default function ChurchHistoryPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* 페이지 헤더 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          큰숲교회 발자취
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          2006년 설립부터 현재까지, 하나님의 은혜 가운데 걸어온 큰숲교회의
          역사입니다.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
      </div>

      {/* 주요 이정표 */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-emerald-800">
          주요 이정표
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            return (
              <Card
                key={idx}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-emerald-800">
                    {milestone.title}
                  </h3>
                  <p className="text-emerald-600 font-semibold mb-2">
                    {milestone.year}
                  </p>
                  <p className="text-sm text-gray-600">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* 연도별 상세 연혁 */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-emerald-800">
          연도별 상세 연혁
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-green-500 max-sm:hidden"></div>

          <div className="space-y-8">
            {churchHistory.map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-8 max-sm:gap-4"
              >
                <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 max-sm:hidden">
                  {item.year.slice(-2)}
                </div>

                <Card className="flex-1 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 max-sm:p-3">
                    <h3 className="text-xl max-sm:text-lg font-bold text-emerald-800 mb-4 max-sm:mb-2">
                      {item.year}년
                    </h3>
                    <div className="space-y-3 max-sm:space-y-2">
                      {item.events.map((event, eventIdx) => (
                        <div
                          key={eventIdx}
                          className="flex gap-4 max-sm:flex-col max-sm:gap-1"
                        >
                          <span className="text-emerald-600 font-semibold min-w-fit max-sm:text-sm">
                            {event.date}
                          </span>
                          <p className="text-gray-700 max-sm:text-sm">
                            {event.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* 년도별 목양계획 */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-emerald-800">
          큰숲 년도별 목양계획
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {yearlyThemes.map((theme, idx) => {
            const Icon = theme.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-emerald-800 mb-2">
                      {theme.year}
                    </h3>
                    <p className="text-lg font-semibold text-emerald-600 mb-2">
                      {theme.theme}
                    </p>
                    <p className="text-sm text-gray-600">{theme.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
