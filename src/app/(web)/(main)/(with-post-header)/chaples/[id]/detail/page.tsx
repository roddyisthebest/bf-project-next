import { Badge } from "@/components/ui/badge";
import { formatDate, toEmbedUrl } from "@/lib/funcs";
import { createClient } from "@/lib/supabase/server";
import { ChapleView, PageProps } from "@/types";
import { Book, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ChapleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const chapleId = Number(id);
  if (!Number.isFinite(chapleId)) notFound();

  const supabase = await createClient();

  const { data: chaple, error } = await supabase
    .from("chaples")
    .select("*") // 필요한 컬럼만 골라서 select 해도 OK
    .eq("id", chapleId)
    .single<ChapleView>();

  if (!chaple) {
    return notFound(); // 404 페이지로
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-col gap-y-6 divide-y">
      <div className="flex flex-col gap-y-4 p-6">
        <h1 className="text-black font-bold text-5xl max-xl:text-4xl max-lg:text-3xl max-sm:text-xl truncate">
          {chaple.title || "No Title"}
        </h1>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
            <Calendar />
            {formatDate(chaple.created_at)}
          </Badge>
          <Badge className="bg-primary-50 border-primary-100 text-primary text-sm py-2 px-3 font-semibold flex gap-x-2">
            <Book />
            {chaple.verse || "No Verses"}
          </Badge>
        </div>
      </div>
      <div className="px-6 pb-6">
        <iframe
          src={toEmbedUrl(chaple.link)}
          title="YouTube video player"
          className="h-96 w-full rounded-lg border border-brand-100"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
