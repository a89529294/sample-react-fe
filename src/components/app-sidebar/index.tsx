import { Home, Inbox } from "lucide-react";

import { CollapsibleSidebarMenu } from "@/components/app-sidebar/collapsible-sidebar-menu";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <CollapsibleSidebarMenu label={"Category 1"} items={items} />
        <CollapsibleSidebarMenu label={"Category 2"} items={items} />
        <CollapsibleSidebarMenu label={"Category 3"} items={items} />
      </SidebarContent>
    </Sidebar>
  );
}
