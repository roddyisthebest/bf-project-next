// components/PostForm.tsx
"use client";

import * as React from "react";
import dynamic from "next/dynamic";
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

import { defaultPostBody } from "@/consts";
import { PostType } from "@/enums";
import { PostBody } from "@/types";
import { createImageUploadCommand } from "./create-image-upload-command";
import { commands, ICommand } from "@uiw/react-md-editor";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const PostSchema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요."),
  content: z.string().min(1, "내용을 입력해 주세요."),
  type: z.any().refine((v) => v !== null && v !== undefined, {
    message: "게시글 유형을 선택해 주세요.",
  }),
});
type PostFormValues = z.infer<typeof PostSchema>;

const enumOptions = ((): string[] => {
  const vals = Object.values(PostType);
  return vals.filter((v) => typeof v === "string") as string[];
})();

export function PostForm({
  initialValues = defaultPostBody,
  onSubmit,
  submitText = "Save",
  typeLabels,
}: {
  initialValues?: PostBody;
  onSubmit: (v: PostBody) => Promise<number> | void;
  submitText?: string;
  typeLabels?: Partial<Record<string, string>>;
}) {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: initialValues.title ?? "",
      content: initialValues.content ?? "",
      type: initialValues.type ?? null,
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toolbarCommands: ICommand[] = useMemo(() => {
    const customImage = createImageUploadCommand(() => {});
    return [
      commands.bold,
      commands.italic,
      commands.strikethrough,
      commands.hr,
      commands.title,
      commands.link,
      commands.quote,
      commands.code,
      commands.unorderedListCommand,
      commands.orderedListCommand,
      commands.checkedListCommand,
      commands.table,
      customImage,
    ];
  }, []);

  const extractFirstImageUrl = (md: string): string | null => {
    const regex = /!\[[^\]]*\]\((?<url>[^)\s]+)(?:\s+"[^"]*")?\)/;
    const match = md.match(regex);
    return match?.groups?.url ?? null;
  };

  const handleSubmit = async (values: PostFormValues) => {
    const payload: PostBody = {
      title: values.title,
      content: values.content,
      type: values.type as PostType,
      thumbnail: extractFirstImageUrl(values.content),
    };

    try {
      setLoading(true);
      const postId = await onSubmit(payload);
      router.replace(`/admin/posts/${postId}/detail`);
      toast.success("게시글이 저장되었습니다.");
    } catch (e) {
      toast.error(
        "게시글 저장에 실패했습니다: " +
          (e instanceof Error ? e.message : String(e))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset({
      title: initialValues.title ?? "",
      content: initialValues.content ?? "",
      type: initialValues.type ?? null,
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
                <FormLabel className="text-emerald-300">게시글 유형</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val as unknown as PostType)
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

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between text-emerald-300">
                  <span>내용 (Markdown)</span>
                </FormLabel>
                <FormControl>
                  <div
                    data-color-mode="dark"
                    className="rounded-md border border-emerald-800 bg-emerald-950/20 p-2"
                  >
                    <MDEditor
                      value={field.value}
                      onChange={(v) => field.onChange(v ?? "")}
                      preview="edit"
                      height={380}
                      commands={toolbarCommands}
                      className="bb-md-editor"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-emerald-300/80" />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={loading}
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

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading}
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
