import { PostHeader } from "./components/post-header";
import { PostMenu } from "./components/post-menu";

export default function PostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-[2fr_8fr] max-lg:grid-cols-[3fr_7fr] divide-x divide-brand-100 border-x border-primary-100">
      <PostMenu />
      <div className="flex flex-col">
        <PostHeader />
        {children}
      </div>
    </div>
  );
}
