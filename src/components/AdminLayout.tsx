import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Scissors, Calendar, Users, Settings, Image, Package, MessageSquare } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <span className="font-display text-xl font-bold text-primary">
              Horty
            </span>
            <span className="font-display text-xl font-light text-foreground">
              Admin
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/dashboard") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/dashboard">
                    <Home className="h-4 w-4" />
                    Tableau de bord
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/services") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/services">
                    <Scissors className="h-4 w-4" />
                    Services
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/products") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/products">
                    <Package className="h-4 w-4" />
                    Produits
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/realizations") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/realizations">
                    <Image className="h-4 w-4" />
                    Réalisations
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/appointments") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/appointments">
                    <Calendar className="h-4 w-4" />
                    Rendez-vous
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/testimonials") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/testimonials">
                    <MessageSquare className="h-4 w-4" />
                    Témoignages
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Configuration</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/settings") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/settings">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </header>
        <div className="flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;