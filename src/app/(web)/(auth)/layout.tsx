import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Link href="/" className="absolute top-6 left-4">
        <h1 className="text-2xl font-bold">Web App</h1>
      </Link>
      <main className="w-full">{children}</main>
      <footer className="h-24 bg-primary"></footer>
    </div>
  );
}
