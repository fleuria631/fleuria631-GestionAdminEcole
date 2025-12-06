import Navbar from "@/app/(main)/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
    </>
  );
}