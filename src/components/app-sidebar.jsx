"use client"

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
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { StorageCard } from "@/components/storage-card"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar"
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
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Crear Empresa",
          url: "#",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Editar Empresa",
          url: "#",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Eliminar Empresa",
          url: "#",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
    {
      title: "Personal",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Crear Personal",
          url: "#",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
        {
          title: "Editar Personal",
          url: "#",
          icon: Bird,
          description: "Performance and speed for efficiency.",
        },
        {
          title: "Eliminar Personal",
          url: "#",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
      ],
    },
    {
      title: "Liquidaciones",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Crear Liquidación",
          url: "#",
        },
        {
          title: "Editar Liquidación",
          url: "#",
        },
        {
          title: "Eliminar Liquidación",
          url: "#",
        },
        {
          title: "Historial Liquidaciones",
          url: "#",
        },
      ],
    },
    {
      title: "Enviar Liquidaciones",
      url: "#",
      icon: Code2,
      items: [
        {
          title: "Email",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
}

export function AppSidebar() {
  return (
    (<Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Menu</SidebarLabel>
          <NavMain items={data.navMain} />
        </SidebarItem>
        {/* <SidebarItem>
          <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem> */}
        <SidebarItem className="mt-auto">
          <SidebarLabel>Ayuda</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        {/* <SidebarItem>
          <StorageCard />
        </SidebarItem> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
