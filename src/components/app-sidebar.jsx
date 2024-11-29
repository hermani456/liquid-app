"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Code2,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
  UserPlus,
  Building,
  HandCoins,
  Mails,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { StorageCard } from "@/components/storage-card";
import { CompanySwitcher } from "@/components/company-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
const data = {
  teams: [
    {
      name: "Negocio de la esquina",
      logo: Atom,
      plan: "Pyme",
    },
    {
      name: "Quiosco de la esquina",
      logo: Eclipse,
      plan: "Prima",
    },
    {
      name: "Tienda de la esquina",
      logo: Rabbit,
      plan: "Empresarial",
    },
  ],
  user: {
    name: "Chupete Suazo",
    email: "chupete@suazo.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Empresas",
      url: "#",
      icon: Building,
      isActive: true,
      items: [
        {
          title: "Crear Empresa",
          url: "/dashboard/company/create-company",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Editar Empresa",
          url: "/dashboard/company/edit-company",
          icon: Star,
          description: "Browse your starred prompts",
        },
      ],
    },
    {
      title: "Personal",
      url: "#",
      icon: UserPlus,
      items: [
        {
          title: "Crear Personal",
          url: "/dashboard/employee/create-employee",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
        {
          title: "Editar Personal",
          url: "/dashboard/employee/edit-employee",
          icon: Bird,
          description: "Performance and speed for efficiency.",
        },
      ],
    },
    {
      title: "Liquidaciones",
      url: "#",
      icon: HandCoins,
      items: [
        {
          title: "Crear Liquidación",
          url: "/dashboard/payroll/create",
        },
      ],
    },
    // {
    //   title: "Enviar Liquidaciones",
    //   url: "#",
    //   icon: Mails,
    //   items: [
    //     {
    //       title: "Email",
    //       url: "#",
    //     },
    //   ],
    // },
  ],

  navSecondary: [
    {
      title: "Soporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Contacto",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar() {
  const { user } = useUser();
  return (
    <Sidebar>
      <SidebarHeader>
        <CompanySwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Menu</SidebarLabel>
          <div className="relative flex items-center">
            <Link
              href="/dashboard/"
              className="min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <div className="flex flex-1 overflow-hidden">
                <div className="line-clamp-1 pr-6">Dashboard</div>
              </div>
            </Link>
          </div>
          <NavMain items={data.navMain} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Ayuda</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <SignedIn>
          <div className="flex gap-3 overflow-auto">
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverCard: { pointerEvents: "initial" },
                },
              }}
            />
            <div className="text-xs max-w-44">
              <div>{user?.fullName}</div>
              <div className="truncate">
                {user?.emailAddresses[0].emailAddress}
              </div>
            </div>
          </div>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
