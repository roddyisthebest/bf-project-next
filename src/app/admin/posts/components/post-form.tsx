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
import { ImageResizeHandler } from "@/components/ui/image-resize-handler";

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
      commands.fullscreen,
    ];
  }, []);

  const extractFirstImageUrl = (md: string): string | null => {
    const regex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/;
    const match = md.match(regex);
    return match?.[1] ?? null;
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
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            {submitText}
          </h1>

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
                <FormLabel className="text-gray-700">게시글 유형</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val as unknown as PostType)
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
                          {typeLabels?.[opt] ?? opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between text-gray-700">
                  <span>내용 (Markdown)</span>
                </FormLabel>
                <FormControl>
                  <div
                    data-color-mode="light"
                    className="rounded-md border border-gray-300 bg-white p-2 image-resize-editor"
                  >
                    <MDEditor
                      value={field.value}
                      onChange={(v) => field.onChange(v ?? "")}
                      preview="edit"
                      height={380}
                      commands={toolbarCommands}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={loading}
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

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading}
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              초기화
            </Button>
          </div>
        </form>
        <ImageResizeHandler />
      </div>
    </Form>
  );
}
