import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { timeTable } from "../../../consts";
import Link from "next/link";

export default function WorshipPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          하나님을 예배하는 것은 우리의 가장 큰 특권이자 기쁨입니다. 큰숲교회의
          예배 시간을 확인하시고 함께 하나님께 예배드려요.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {timeTable.map((worship, idx) => {
          const getWorshipLink = (title: string) => {
            switch (title) {
              case '주일예배':
                return '/chaples/sunday';
              case '수요예배':
                return '/chaples/wednesday';
              case '금요기도회':
                return '/chaples/friday';
              default:
                return null;
            }
          };
          
          const worshipLink = getWorshipLink(worship.title);
          
          return (
            <Card
              key={idx}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {worship.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-primary-50 text-primary border-primary-200"
                  >
                    정기예배
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {worship.content}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      큰숲교회 본당 (2층)
                    </div>
                    {worshipLink && (
                      <Link href={worshipLink}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-600">
                          상세보기
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-primary-50 to-brand-50 border-primary-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            예배 참석 안내
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-primary-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                처음 오시는 분
              </h3>
              <p className="text-sm text-gray-600">
                예배 시작 10분 전까지 오시면 됩니다. 안내 데스크에서 도움을
                받으실 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-primary-100">
              <h3 className="font-semibold text-gray-900 mb-2">주차 안내</h3>
              <p className="text-sm text-gray-600">
                교회 전용 주차장을 이용하실 수 있습니다. 주차 공간이 부족할 경우
                인근 공영주차장을 이용해 주세요.
              </p>
            </div>
          </div>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              문의사항이 있으시면 언제든지 교회 사무실로 연락해 주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
