import DashboardContent from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductsTab from "./ProductsTab";

function ProductsPage() {
  const navigate = useNavigate();

  return (
    <DashboardContent title="Products">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Draft</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Newest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Oldest</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => navigate("create")}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <ProductsTab />
        </TabsContent>

        <TabsContent value="active">
          <ProductsTab status="ACTIVE" cardTitle="Active Products" />
        </TabsContent>

        <TabsContent value="inactive">
          <ProductsTab status="INACTIVE" cardTitle="Draft Products" />
        </TabsContent>
      </Tabs>
    </DashboardContent>
  );
}

export default ProductsPage;
