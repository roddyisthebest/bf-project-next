// components/PostForm.tsx
"use client";
import { useState } from "react";

type Values = { title: string; body: string; published: boolean };
export function PostForm({
  initialValues = { title: "", body: "", published: false },
  onSubmit,
  submitText = "Save",
}: {
  initialValues?: Values;
  onSubmit: (v: Values) => Promise<void> | void;
  submitText?: string;
}) {
  const [v, setV] = useState(initialValues);
  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(v);
      }}
    >
      <input
        className="w-full input"
        placeholder="Title"
        value={v.title}
        onChange={(e) => setV({ ...v, title: e.target.value })}
      />
      <textarea
        className="w-full textarea h-40"
        placeholder="Body"
        value={v.body}
        onChange={(e) => setV({ ...v, body: e.target.value })}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={v.published}
          onChange={(e) => setV({ ...v, published: e.target.checked })}
        />
        Published
      </label>
      <button className="btn btn-primary">{submitText}</button>
    </form>
  );
}
