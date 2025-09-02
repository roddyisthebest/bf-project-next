import Footer from "../(main)/components/footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
