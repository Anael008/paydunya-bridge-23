import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Image,
  ShoppingCart,
  CreditCard,
  Users,
  RefreshCw,
  Settings,
  DollarSign,
  MessageSquare,
  Headphones,
  BarChart,
  Globe,
  Palette,
  Power,
  ChevronLeft,
  Menu,
  LayoutDashboard,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { icon: Home, label: "Accueil", path: "/home" },
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard" },
  { icon: Box, label: "Produit", path: "/products" },
  { icon: Image, label: "Média", path: "/media" },
  { icon: ShoppingCart, label: "Commandes", path: "/orders" },
  { icon: CreditCard, label: "Paiements", path: "/payments" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: RefreshCw, label: "Rembourser", path: "/refunds" },
  { icon: Settings, label: "Réglages", path: "/settings" },
  { icon: DollarSign, label: "Mon Argent", path: "/money" },
  { icon: MessageSquare, label: "Avis", path: "/reviews" },
  { icon: Headphones, label: "Support", path: "/support" },
  { icon: BarChart, label: "Facebook Pixel", path: "/facebook-pixel" },
  { icon: Globe, label: "Mon Domaine", path: "/domain" },
  { icon: DollarSign, label: "Devise", path: "/currency" },
  { icon: Palette, label: "Configuration theme", path: "/theme" },
  { icon: Power, label: "Deconnexion", path: "/logout" },
];

const MainSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <div className="relative">
      {isCollapsed ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-50 bg-background"
        >
          <Menu className="h-4 w-4" />
        </Button>
      ) : (
        <SidebarProvider defaultOpen={!isMobile}>
          <Sidebar 
            className={cn(
              "border-r border-gray-200 dark:border-gray-800",
              isMobile && "fixed inset-0 z-50 bg-background shadow-lg"
            )}
          >
            <SidebarHeader className="p-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src="/lovable-uploads/cba544ba-0ad2-4425-ba9c-1ce8aed026cb.png"
                    alt="Logo"
                    className="w-8 h-8"
                  />
                  <span className="font-semibold text-blue-600">Digit-Sarl</span>
                </div>
                <span className="text-sm">Welcome Arnel Anael</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(true)}
                  className="absolute right-2 top-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg",
                          location.pathname === item.path && "bg-gray-100 dark:bg-gray-800"
                        )}
                        onClick={() => isMobile && setIsCollapsed(true)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )}
    </div>
  );
};

export default MainSidebar;