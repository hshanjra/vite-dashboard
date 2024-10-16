import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  Bell,
  CircleUser,
  DollarSign,
  Home,
  LineChart,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

function DashboardLayout() {
  const { pathname } = useLocation();

  const { handleLogout } = useAuth();

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to="/" className="flex items-center gap-1 font-semibold">
                <img src="/logo.svg" className="h-10" />
                <h3 className="font-light text-base mt-1">
                  Seller<span className="font-bold text-base">Zone</span>
                </h3>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                    {
                      "bg-muted text-primary": pathname === "/",
                    }
                  )}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                    {
                      "bg-muted text-primary": pathname.startsWith("/orders"),
                    }
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                  <span className="ml-auto bg-black text-white flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    6
                  </span>
                </Link>
                <Link
                  to="/products"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                    {
                      "bg-muted text-primary": pathname.startsWith("/products"),
                    }
                  )}
                >
                  <Package className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  to="/finances"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                    {
                      "bg-muted text-primary": pathname.startsWith("/finances"),
                    }
                  )}
                >
                  <DollarSign className="h-4 w-4" />
                  Finances
                </Link>
                <Link
                  to="/analytics"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                    {
                      "bg-muted text-primary":
                        pathname.startsWith("/analytics"),
                    }
                  )}
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  to="/settings/store"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                    {
                      "bg-muted text-primary":
                        pathname.startsWith("/settings/store"),
                    }
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Store Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <img src="/assets/byp-logo.webp" className="h-8" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    to="/"
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-none px-3 py-2 text-muted-foreground hover:text-foreground",
                      {
                        "bg-muted text-primary": pathname === "/",
                      }
                    )}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-none px-3 py-2 text-muted-foreground hover:text-foreground",
                      {
                        "bg-muted text-primary": pathname.startsWith("/orders"),
                      }
                    )}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                    <span className="ml-auto bg-black text-white flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </span>
                  </Link>
                  <Link
                    to="/products"
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-none px-3 py-2 text-muted-foreground hover:text-foreground",
                      {
                        "bg-muted text-primary":
                          pathname.startsWith("/products"),
                      }
                    )}
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    to="/finances"
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-none px-3 py-2 text-muted-foreground hover:text-foreground",
                      {
                        "bg-muted text-primary":
                          pathname.startsWith("/finances"),
                      }
                    )}
                  >
                    <DollarSign className="h-5 w-5" />
                    Finances
                  </Link>
                  <Link
                    to="/analytics"
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-none px-3 py-2 text-muted-foreground hover:text-foreground",
                      {
                        "bg-muted text-primary":
                          pathname.startsWith("/analytics"),
                      }
                    )}
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* Children */}
            <Outlet />
          </main>
        </div>
      </div>
      {/* TODO: Add footer */}
      <Toaster />
    </>
  );
}

export default DashboardLayout;
