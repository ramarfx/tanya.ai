import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const MainLayout = () => {
  return (
    <section className="h-screen w-full px-10 pb-10 relative bg-[#DCEEFF] flex flex-row pl-[300px]">
      <Sidebar />

      <main className="w-full h-full flex justify-center items-end">
        <div className="relative max-w-screen-sm w-full flex items-center">
          <Input className="py-6" placeholder="Ketikkan Pertanyaanmu..." />
          <Button className="absolute right-1.5 bg-primary">
            <ArrowRight className="size-[18px]" />
          </Button>
        </div>
      </main>
    </section>
  );
};

export default MainLayout;
