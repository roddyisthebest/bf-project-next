// app/admin/chaples/[id]/edit/page.tsx
import { ChapleBody, PageProps } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ChapleForm } from "../../components/chaple-form";
export default async function EditChaplePage({ params }: PageProps) {
  const { id } = await params;
  const chapleId = Number(id);
  if (!Number.isFinite(chapleId)) notFound();

  const supabase = await createClient();

  const { data: chaple, error } = await supabase
    .from("chaples")
    .select("*") // 필요한 컬럼만 골라서 select 해도 OK
    .eq("id", chapleId)
    .single();

  if (error || !chaple) {
    notFound(); // 404 페이지로
  }

  async function update(values: ChapleBody) {
    "use server";

    const supabase = await createClient();
    const { data: inserted, error } = await supabase
      .from("chaples")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", chapleId)
      .select("id")
      .single();

    if (error) {
      throw new Error(`posts insert 실패: ${error.message}`);
    }

    const updatedChapleId = inserted!.id as number;
    // 성공적으로 생성된 후 리다이렉트 (예: 상세 페이지로)
    return updatedChapleId;
  }
  return (
    <ChapleForm
      initialValues={chaple}
      onSubmit={update}
      submitText="예배 수정"
      chapleId={chapleId}
    />
  );
}
