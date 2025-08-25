import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { ChapleView } from "@/types";
import { Book, Calendar } from "lucide-react";

export default async function SermonSection() {
  const supabase = await createClient();

  const { data: recentChaple, error } = await supabase
    .from("chaples")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single<ChapleView>();

  function toEmbedUrl(link: string | undefined): string {
    if (!link) return "";

    // 1) watch?v= 형태
    if (link.includes("watch?v=")) {
      return link.replace("watch?v=", "embed/");
    }

    // 2) youtu.be 단축링크
    if (link.includes("youtu.be/")) {
      const videoId = link.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // 3) 이미 embed 링크인 경우 그대로
    if (link.includes("embed/")) {
      return link;
    }

    return link;
  }

  function formatDate(date: string | null | undefined) {
    if (!date) return "-";
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date(date))
      .replace(/-/g, "."); // 혹시 브라우저 환경별 "-" 나올 경우 대비
  }

  if (error) {
    return (
      <section className="p-5 flex flex-col gap-y-5 min-w-0">
        <div className="flex flex-col gap-y-1">
          <Label className="text-primary font-bold text-xl">SERMON</Label>
          <p className="text-neutral text-lg font-medium">주일예배</p>
        </div>

        <div className="flex min-h-64 items-center justify-center rounded-lg border border-red-300 bg-red-50">
          <p className="text-red-600 font-semibold">
            ⚠️ 최근 설교 영상을 불러오지 못했습니다.
          </p>
          {error?.message && <p>{error.message}</p>}
        </div>
      </section>
    );
  }

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
