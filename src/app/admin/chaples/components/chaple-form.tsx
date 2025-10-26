// components/ChapleForm.tsx
"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { defaultChaple } from "@/consts";
import { ChapleType } from "@/enums";
import { ChapleBody } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ChapleSchema = z.object({
  link: z
    .url("올바른 URL 형식을 입력해주세요.")
    .refine(
      (val) => /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(val),
      {
        message: "유효한 유튜브 링크를 입력해주세요.",
      }
    ),
  title: z.string().min(1, "제목을 입력해 주세요."),
  verse: z.string().min(1, "성경 구절을 입력해 주세요."),
  type: z.any().refine((v) => v !== null && v !== undefined, {
    message: "예배 유형을 선택해 주세요.",
  }),
});
type ChapleFormValues = z.infer<typeof ChapleSchema>;

const enumOptions = ((): string[] => {
  const vals = Object.values(ChapleType);
  return vals.filter((v) => typeof v === "string") as string[];
})();

const defaultTypeLabels: Record<string, string> = {
  [ChapleType.Friday]: "금요예배",
  [ChapleType.Sunday]: "주일예배",
  [ChapleType.Special]: "특별집회",
};

export function ChapleForm({
  initialValues = defaultChaple,
  onSubmit,
  submitText = "Save",
  typeLabels,
  chapleId,
}: {
  initialValues?: ChapleBody;
  onSubmit: (v: ChapleBody) => Promise<number> | void;
  submitText?: string;
  typeLabels?: Partial<Record<string, string>>;
  chapleId?: number;
}) {
  const form = useForm<ChapleFormValues>({
    resolver: zodResolver(ChapleSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values: ChapleFormValues) => {
    const payload: ChapleBody = {
      ...values,
    };

    try {
      setLoading(true);
      const postId = await onSubmit(payload);
      router.replace(`/admin/chaples/${postId}/edit`);
      toast.success("예배 article이 저장되었습니다.");
    } catch (e) {
      toast.error(
        "예배 article 저장에 실패했습니다: " +
          (e instanceof Error ? e.message : String(e))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!chapleId) return;
    if (!confirm("정말 이 예배 article을 삭제하시겠습니까?")) return;
    setDeleting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("chaples")
        .delete()
        .eq("id", chapleId);
      if (error) {
        toast.error("삭제 중 오류가 발생했습니다: " + error.message);
        return;
      }
      router.replace("/admin/chaples");
      toast.success("예배 article이 삭제되었습니다.");
    } catch (e) {
      console.error(e);
      toast.error(
        "삭제 중 오류가 발생했습니다: " + (e instanceof Error ? e.message : e)
      );
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    form.reset({
      ...initialValues,
    });
    console.log(initialValues, "initialValues");
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">{submitText}</h1>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">제목</FormLabel>
                <FormControl>
                  <Input
                    placeholder="제목을 입력하세요"
                    {...field}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">예배 유형</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) =>
                      field.onChange(val as unknown as ChapleType)
                    }
                  >
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500">
                      <SelectValue placeholder="유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent
                      className="border-gray-200 bg-white text-gray-900"
                      position="popper"
                      sideOffset={4}
                    >
                      {enumOptions.map((opt) => (
                        <SelectItem
                          key={opt}
                          value={opt}
                          className="focus:bg-gray-100 data-[highlighted]:bg-gray-100"
                        >
                          {typeLabels?.[opt] ?? defaultTypeLabels[opt] ?? opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Link */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">유튜브 링크</FormLabel>
                <FormControl>
                  <Input
                    placeholder="유튜브 링크를 입력하세요"
                    {...field}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Verse */}
          <FormField
            control={form.control}
            name="verse"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">성경 구절</FormLabel>
                <FormControl>
                  <Input
                    placeholder="성경 구절을 입력하세요"
                    {...field}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={loading || deleting}
              className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  저장 중…
                </span>
              ) : (
                submitText
              )}
            </Button>
            {chapleId && (
              <Button
                type="button"
                disabled={loading || deleting}
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              >
                {deleting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    삭제 중...
                  </span>
                ) : (
                  "삭제"
                )}
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading || deleting}
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              초기화
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
