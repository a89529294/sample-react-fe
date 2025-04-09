import { Home, Inbox, RefreshCcw, Delete } from "lucide-react";

import { CollapsibleSidebarMenu } from "@/components/app-sidebar/collapsible-sidebar-menu";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

const productionRoutes = [
  {
    title: "Create",
    url: "/production/create",
    icon: Home,
  },
  {
    title: "Read",
    url: "/production/read",
    icon: Inbox,
  },
  {
    title: "Update",
    url: "/production/update",
    icon: RefreshCcw,
  },
  {
    title: "Delete",
    url: "/production/delete",
    icon: Delete,
  },
];
const personnelRoutes = [
  {
    title: "Create",
    url: "/personnel/create",
    icon: Home,
  },
  {
    title: "Read",
    url: "/personnel/read",
    icon: Inbox,
  },
  {
    title: "Update",
    url: "/personnel/update",
    icon: RefreshCcw,
  },
  {
    title: "Delete",
    url: "/personnel/delete",
    icon: Delete,
  },
];
const basicInfoRoutes = [
  {
    title: "Create",
    url: "/basic-info/create",
    icon: Home,
  },
  {
    title: "Read",
    url: "/basic-info/read",
    icon: Inbox,
  },
  {
    title: "Update",
    url: "/basic-info/update",
    icon: RefreshCcw,
  },
  {
    title: "Delete",
    url: "/basic-info/delete",
    icon: Delete,
  },
];
const storageRoutes = [
  {
    title: "Create",
    url: "/storage/create",
    icon: Home,
  },
  {
    title: "Read",
    url: "/storage/read",
    icon: Inbox,
  },
  {
    title: "Update",
    url: "/storage/update",
    icon: RefreshCcw,
  },
  {
    title: "Delete",
    url: "/storage/delete",
    icon: Delete,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <CollapsibleSidebarMenu label={"生產管理"} items={productionRoutes} />
        <CollapsibleSidebarMenu label={"人事權限"} items={personnelRoutes} />
        <CollapsibleSidebarMenu label={"基本資料"} items={basicInfoRoutes} />
        <CollapsibleSidebarMenu label={"倉庫管理"} items={storageRoutes} />
      </SidebarContent>
    </Sidebar>
  );
}
