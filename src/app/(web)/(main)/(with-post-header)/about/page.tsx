import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Users, BookOpen, Compass, Church, Check } from "lucide-react";
import { churchFeatures, churchMeaning, churchVision } from "../../consts";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* 큰숲 의미 섹션 */}
      <section className="text-center space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {churchMeaning.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4">
              <div
                className={`w-32 h-32 bg-gradient-to-br ${
                  idx === 0
                    ? "from-emerald-400 to-emerald-600"
                    : "from-green-400 to-green-600"
                } rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-lg`}
              >
                {item.title}
              </div>
              <div className="text-center">
                {item.description.map((desc, descIdx) => (
                  <p key={descIdx} className="text-lg text-gray-700">
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* 인사말 섹션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50"></div>
        <div className="relative max-w-6xl mx-auto py-16 px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              큰숲교회에 초청합니다
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100">
                <p className="text-lg font-medium text-emerald-700 mb-6 text-center">
                  큰숲교회는 대한예수교장로회 합동에 속한 교회입니다.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      '왜 이렇게 살아야 하는지?' 알 수만 있다면..
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      진정한 사랑과 격려를 주고 받을 수 있는 만남과 사람이 있다면..
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      또한 내가 그런 사람으로 변화할 수 있도록 도와줄 수 있는 곳이 있다면..
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4">
                  2006년 봄, 큰숲교회가 시작된 이후
                </h3>
                <p className="mb-4 leading-relaxed">
                  저희들은 불가능할 것 같았던 질문에 대해 'yes'라는 답을 가지게 되었습니다.
                </p>
                <div className="text-xl font-bold">
                  <p>삶을 맛깔나게 하는</p>
                  <p>천국 모델하우스 &lt;큰숲교회&gt;</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <Image
                src="/pastor.png"
                alt="담임목사 이희동"
                width={280}
                height={350}
                className="object-cover"
              />
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-800 mb-2">
                  담임목사 이희동
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                자기의 삶과 인생, 가족, 직장 등 인생에 대해 포기하지 못하는 질문을 가지고 계시는 분들,
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                그리고 건강한 사람들 아니 더 정확히 말하면 건강해져가는 사람들과
              </p>
              <p className="text-xl font-bold text-emerald-700">
                진실한 만남을 원하시는 분들을 우리 큰숲교회에 초대합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 큰숲 비전 섹션 */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-emerald-800">
          큰숲 비전
        </h2>
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/vision.jpg"
              alt="큰숲 비전 배경"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-white/50"></div>
          </div>
          <div className="relative z-10 p-8">
            <div className="grid md:grid-cols-5 gap-6 mb-8">
              {churchVision.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={idx}
                    className="text-center hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                      <h3 className="font-bold text-lg mb-2 text-emerald-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" />
                  <span className="font-semibold">건강한 교회</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" />
                  <span className="font-semibold">세우는 교회</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" />
                  <span className="font-semibold">섬기는 교회</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 큰숲은 이렇게 섹션 */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-emerald-800">
          큰숲은 이렇게
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {churchFeatures.map((item, idx) => (
            <Card key={idx} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border-0 bg-white">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6 relative">
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-6 space-y-3">
                  {item.content.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
