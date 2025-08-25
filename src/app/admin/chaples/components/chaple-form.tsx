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
import clsx from "clsx";
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
    defaultValues: defaultChaple,
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

  console.log(initialValues, "initialsValue");

  useEffect(() => {
    form.reset({
      ...initialValues,
    });
  }, [initialValues, form]);

  return (
    <Form {...form}>
      {/* CRT 느낌의 박스 */}
      <div className="relative  border border-emerald-700/40 bg-[#0b0f0a] p-4 shadow-[0_0_32px_rgba(16,185,129,0.15)]">
        {/* subtle scanlines */}
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20 animate-scanlines [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />
        {/* inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-xl [box-shadow:inset_0_0_28px_rgba(16,185,129,0.12)]" />

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative z-10 space-y-6"
        >
          <h1 className="text-2xl font-black tracking-tight text-emerald-200 drop-shadow-[0_0_16px_rgba(16,185,129,0.28)] animate-glow">
            {submitText}
          </h1>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-300">제목</FormLabel>
                <FormControl>
                  <Input
                    placeholder="제목을 입력하세요"
                    {...field}
                    className={clsx(
                      "bg-emerald-950/30 border-emerald-800 text-emerald-50 placeholder:text-emerald-300/40",
                      "focus-visible:ring-emerald-400 focus-visible:ring-offset-0"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-emerald-300/80" />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-300">예배 유형</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) =>
                      field.onChange(val as unknown as ChapleType)
                    }
                  >
                    <SelectTrigger
                      className={clsx(
                        "bg-emerald-950/30 border-emerald-800 text-emerald-50",
                        "focus:ring-emerald-400"
                      )}
                    >
                      <SelectValue placeholder="유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent
                      className="border-emerald-800 bg-[#0b0f0a] text-emerald-50"
                      position="popper"
                      sideOffset={4}
                    >
                      {enumOptions.map((opt) => (
                        <SelectItem
                          key={opt}
                          value={opt}
                          className="focus:bg-emerald-900/50 data-[highlighted]:bg-emerald-900/60"
                        >
                          {typeLabels?.[opt] ?? opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-emerald-300/80" />
              </FormItem>
            )}
          />

          {/* Link */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-300">유튜브 링크</FormLabel>
                <FormControl>
                  <Input
                    placeholder="유튜브 링크를 입력하세요"
                    {...field}
                    className={clsx(
                      "bg-emerald-950/30 border-emerald-800 text-emerald-50 placeholder:text-emerald-300/40",
                      "focus-visible:ring-emerald-400 focus-visible:ring-offset-0"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-emerald-300/80" />
              </FormItem>
            )}
          />

          {/* Verse */}
          <FormField
            control={form.control}
            name="verse"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-300">성경 구절</FormLabel>
                <FormControl>
                  <Input
                    placeholder="성경 구절을 입력하세요"
                    {...field}
                    className={clsx(
                      "bg-emerald-950/30 border-emerald-800 text-emerald-50 placeholder:text-emerald-300/40",
                      "focus-visible:ring-emerald-400 focus-visible:ring-offset-0"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-emerald-300/80" />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={loading || deleting}
              className={clsx(
                "relative bg-emerald-600 text-white hover:bg-emerald-500",
                "shadow-[0_0_16px_rgba(16,185,129,0.25)] hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]"
              )}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Saving…
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
                className={clsx(
                  "relative bg-emerald-600 text-white hover:bg-emerald-500",
                  "shadow-[0_0_16px_rgba(16,185,129,0.25)] hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                )}
              >
                {deleting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading || deleting}
              className="border-emerald-700/60 bg-transparent text-emerald-200 hover:bg-emerald-900/30"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
