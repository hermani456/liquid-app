import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default async function Page({ children }) {
  const { cookies } = await import("next/headers");
  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 p-2">
          <div className="flex">
            <SidebarTrigger />
            <div className="ml-auto">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="min-h-[32rem]">{children}</div>
        </div>
      </main>
    </SidebarLayout>
  );
}
