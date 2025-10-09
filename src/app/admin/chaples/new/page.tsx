import { createClient } from "@/lib/supabase/server";
import { ChapleBody } from "@/types";
import { ChapleForm } from "../components/chaple-form";

export default function NewChaplePage() {
  async function create(values: ChapleBody) {
    "use server"; // 서버 액션 사용 시

    const supabase = await createClient();
    const { data: inserted, error } = await supabase
      .from("chaples")
      .insert({
        ...values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(`chaples insert 실패: ${error.message}`);
    }

    const chapleId = inserted!.id as number;
    // 성공적으로 생성된 후 리다이렉트 (예: 상세 페이지로)
    return chapleId;
  }

  return <ChapleForm onSubmit={create} submitText="예배 등록" />;
}
