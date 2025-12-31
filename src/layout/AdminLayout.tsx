import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarGroup, SidebarGroupLabel, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Scissors, Users, Settings, Image, Package, MessageSquare, Tag, Newspaper, Sparkles, ChevronDown, Star } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPrestationOpen, setIsPrestationOpen] = useState(
    location.pathname === "/admin/prestations" ||
    location.pathname === "/admin/services" ||
    location.pathname === "/admin/categories"
  );
  const [isProductOpen, setIsProductOpen] = useState(
    location.pathname === "/admin/products" ||
    location.pathname === "/admin/partners" ||
    location.pathname === "/admin/product-categories"
  );

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
                <Collapsible open={isPrestationOpen} onOpenChange={setIsPrestationOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`hover:bg-primary/10 hover:text-primary ${
                        isActive("/admin/prestations") ? "bg-primary/10 text-primary" : ""
                      }`}
                      onClick={() => {
                        navigate("/admin/prestations");
                        setIsPrestationOpen(true);
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                      Prestations
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/admin/services")}
                      >
                        <Link to="/admin/services">
                          <Scissors className="h-4 w-4" />
                          Services
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/admin/categories")}
                      >
                        <Link to="/admin/categories">
                          <Tag className="h-4 w-4" />
                          Catégories
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </Collapsible>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible open={isProductOpen} onOpenChange={setIsProductOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`hover:bg-primary/10 hover:text-primary ${
                        isActive("/admin/products") ? "bg-primary/10 text-primary" : ""
                      }`}
                      onClick={() => {
                        navigate("/admin/products");
                        setIsProductOpen(true);
                      }}
                    >
                      <Package className="h-4 w-4" />
                      Produits
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/admin/product-categories")}
                      >
                        <Link to="/admin/product-categories">
                          <Tag className="h-4 w-4" />
                          Catégories
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/admin/partners")}
                      >
                        <Link to="/admin/partners">
                          <Users className="h-4 w-4" />
                          Marques
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </Collapsible>
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
                    isActive("/admin/testimonials") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/testimonials">
                    <MessageSquare className="h-4 w-4" />
                    Témoignages
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/feedbacks") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/feedbacks">
                    <Star className="h-4 w-4" />
                    Feedbacks
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary ${
                    isActive("/admin/news") ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Link to="/admin/news">
                    <Newspaper className="h-4 w-4" />
                    Actualités
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

