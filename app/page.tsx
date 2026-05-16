"use client";
import { SidebarNavigationSectionsSubheadingsDemo } from "./components/sidebarNavigation";
import { InputArea } from "./components/fieldInput";
import Image from "next/image";
export default function Home() {
  return (
    <main>
      <SidebarNavigationSectionsSubheadingsDemo />
      <div className="lg:ml-70 px-10 py-2">
        <Image
        src="/logo/BrieflyWhite.png"
        alt="Briefly AI Logo"
        width={200}
        height={100}
        className="mx-auto"
        style={{ width: "auto" }}
      />
        <h1 className="text-4xl font-bold text-center">Welcome To Briefly AI</h1>
        <h4 className="text-center mt-4">We Can Help You Copywriting & Marketing Assistant</h4>
        <div className="mt-10">
          <InputArea />
        </div>
      </div>
    </main>
  );
}
