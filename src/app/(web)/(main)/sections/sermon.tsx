import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatDate, toEmbedUrl } from "@/lib/funcs";
import { createClient } from "@/lib/supabase/server";
import { ChapleView } from "@/types";
import { Book, Calendar } from "lucide-react";

export default async function SermonSection() {
  const supabase = await createClient();

  const { data: chaples, error } = await supabase
    .from("chaples")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !chaples || chaples.length === 0) {
    return (
      <section className="p-5 flex flex-col gap-y-5 min-w-0">
        <div className="flex flex-col gap-y-1">
          <Label className="text-primary font-bold text-xl">SERMON</Label>
          <p className="text-neutral text-lg font-medium">주일예배</p>
        </div>

        <div className="flex min-h-64 items-center justify-center rounded-lg border flex-col border-gray-200 bg-gray-50">
          <p className="text-gray-600 font-medium">
            아직 업로드된 설교 영상이 없습니다.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            공지사항을 확인해 주세요.
          </p>
        </div>
      </section>
    );
  }

  const recentChaple = chaples[0] as ChapleView;

  return (
    <section className="p-5 flex flex-col gap-y-5 min-w-0">
      <div className="flex flex-col gap-y-1">
        <Label className="text-primary font-bold text-xl">SERMON</Label>
        <p className="text-neutral text-lg font-medium">주일예배</p>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-black font-bold text-5xl max-xl:text-4xl max-lg:text-3xl max-sm:text-xl truncate">
            {recentChaple.title || "No Title"}
          </h1>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
              <Calendar />
              {formatDate(recentChaple.created_at)}
            </Badge>
            <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
              <Book />
              {recentChaple.verse || "No Verses"}
            </Badge>
          </div>
        </div>
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={toEmbedUrl(recentChaple.link)}
            title="YouTube video player"
            className="h-full w-full rounded-lg border border-brand-100"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </AspectRatio>
      </div>
    </section>
  );
}
