import { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisIcon, Loader, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/logo";
import LogoutDialog from "./logout-dialog";
import { Separator } from "../ui/separator";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();

  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="!py-0 dark:bg-background">
          <div className="flex h-[50px] items-center justify-start w-full px-1">
            <Logo url={`/workspace/${workspaceId}`} />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="hidden md:flex ml-2 items-center gap-2 self-center font-medium"
              >
                ImageX
              </Link>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className=" !mt-0 dark:bg-background">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent>
              <SidebarGroup>
                <SidebarMenu>
                <SidebarMenuItem key={"sdg"}>
                    <SidebarMenuButton asChild>
                      <Link to={"workspace"} className="!text-[15px]">
                        <span>{"Upload an Image"}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Separator />


                  <SidebarMenuItem key={"sdg"}>
                    <SidebarMenuButton asChild>
                      <Link to={"view-images"} className="!text-[15px]">
                        <span>{"View Images"}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="dark:bg-background">
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <Loader
                  size="24px"
                  className="place-self-center self-center animate-spin"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >

                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                      <EllipsisIcon className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={"bottom"}
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup></DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Asidebar;
