import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* "left" 14% */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 border border-r-gray-100">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo2.png" width={32} height={32} alt="logo"></Image>
          <span className="hidden lg:block font-semibold text-xl text-hurryGreen">
            Hurryep
          </span>
        </Link>
        <Menu />
      </div>
      {/* "right" 86% */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}