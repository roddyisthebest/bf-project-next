import { PostHeader } from "./components/post-header";
import { PostMenu } from "./components/post-menu";

export default function PostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex max-md:flex-col max-md:divide-y max-md:divide-x-0 divide-x divide-brand-100 border-x border-primary-100">
      <PostMenu />
      <div className="flex flex-1 flex-col">
        <PostHeader />
        {children}
      </div>
    </div>
  );
}
