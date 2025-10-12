import Image from "next/image";
import { domesticMissions } from "../../consts";
import { Users } from "lucide-react";

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">국내선교</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            큰숲교회에서 후원하고 있는 소중한 아이들을 소개합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {domesticMissions.map((child) => (
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
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {child.name}
                  </h3>
                  {child.country && (
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      <span className="text-lg">{child.countryFlag}</span>
                      <span className="text-sm text-gray-600 font-medium">
                        {child.country}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-emerald-600 font-medium">
                    <Users className="w-4 h-4 mr-2" />
                    후원 중
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
