import Image from "next/image";
import { internationalMissions } from "../../../consts";
import { Globe, Users } from "lucide-react";

export default function InternationalMissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">해외선교</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            큰숲교회에서 후원하고 있는 해외의 소중한 아이들을 소개합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {internationalMissions.map((child) => (
            <div
              key={child.id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={child.image}
                  alt={child.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                  <span className="text-2xl">{child.countryFlag}</span>
                  <span className="text-sm font-medium text-gray-700">{child.country}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {child.name}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">{child.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600 font-medium">
                    <Users className="w-4 h-4 mr-2" />
                    후원 중
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Globe className="w-4 h-4 mr-1" />
                    {child.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}