// components/PostForm.tsx (핵심만 발췌)
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
      // 1줄 툴바 예시 (원하면 더 넣으세요)
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
      customImage, // ← 여기!
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
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 px-4"
      >
        <h1 className="text-2xl font-bold">{submitText}</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>게시글 유형</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={(val) =>
                    field.onChange(val as unknown as PostType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {enumOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {typeLabels?.[opt] ?? opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content with Upload Button */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>내용 (Markdown)</span>
                {/* <span className="flex gap-2">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onChangeFile}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={pickImage}
                    disabled={uploading}
                  >
                    {uploading ? "업로드 중..." : "이미지 업로드"}
                  </Button>
                </span> */}
              </FormLabel>

              <FormControl>
                <div data-color-mode="light" className="rounded-md border p-2">
                  <MDEditor
                    value={field.value}
                    onChange={(v) => field.onChange(v ?? "")}
                    preview="edit" // "live" / "preview" 가능
                    height={380}
                    commands={toolbarCommands} // ✅ 커스텀 툴바 주입
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : submitText}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
