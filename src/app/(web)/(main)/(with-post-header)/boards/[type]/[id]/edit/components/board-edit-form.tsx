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
import { createImageUploadCommand } from "@/app/admin/posts/components/create-image-upload-command";
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
  return vals.filter((v) => typeof v === "string" && v !== "image") as string[];
})();

export function BoardEditForm({
  initialValues = defaultPostBody,
  onSubmit,
  submitText = "Save",
  typeLabels,
}: {
  initialValues?: PostBody;
  onSubmit: (v: PostBody) => Promise<{ id: number; type: string }> | void;
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
      const result = await onSubmit(payload);
      if (result) {
        toast.success("게시글이 수정되었습니다.");
        router.push(`/boards/${result.type}/${result.id}/detail`);
      }
    } catch (e) {
      toast.error(
        "게시글 수정에 실패했습니다: " +
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
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
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
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input
                    placeholder="제목을 입력하세요"
                    {...field}
                    className="focus-visible:ring-primary"
                  />
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
                    <SelectTrigger className="focus:ring-primary">
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

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용 (Markdown)</FormLabel>
                <FormControl>
                  <div
                    data-color-mode="light"
                    className="rounded-md border border-gray-300"
                  >
                    <MDEditor
                      value={field.value}
                      onChange={(v) => field.onChange(v ?? "")}
                      preview="live"
                      height={400}
                      commands={toolbarCommands}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  저장 중...
                </span>
              ) : (
                submitText
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}