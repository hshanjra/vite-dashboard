"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HandCoins,
  PackagePlus,
  Receipt,
  Star,
  UserRoundPlus,
  Files,
  Eye,
  ChevronDown,
} from "lucide-react";

// Table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardContent from "@/components/DashboardContent";

const invoices = [
  {
    invoice: "#11731",
    date: "March 7, 2024",
    Shipment: "Done",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    // paymentMethod: "Credit Card",
  },
  {
    invoice: "#11731",
    date: "March 7, 2024",
    Shipment: "Pending",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    // paymentMethod: "PayPal",
  },
  {
    invoice: "INV0#1173103",
    date: "March 7, 2024",
    Shipment: "Done",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    // paymentMethod: "Bank Transfer",
  },
  {
    invoice: "#11731",
    date: "March 7, 2024",
    Shipment: "Done",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    // paymentMethod: "Credit Card",
  },
  {
    invoice: "#11731",
    date: "March 7, 2024",
    Shipment: "Pending",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    // paymentMethod: "PayPal",
  },
  {
    invoice: "#11731",
    date: "March 7, 2024",
    Shipment: "Pending",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    // paymentMethod: "Bank Transfer",
  },
  {
    invoice: "#11731",
    date: "March 7, 2024",
    Shipment: "Done",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    // paymentMethod: "Credit Card",
  },
];

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function IndexPage() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
  return (
    <DashboardContent title="Dashboard">
      <div>
        {/* <div className=" mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-left">
            Dashboard
          </h2>
        </div> */}

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Total Sales", value: "$12,345", change: "+15%" },
            { title: "Orders", value: "256", change: "+8%" },
            { title: "Customers", value: "1,234", change: "+12%" },
            { title: "Avg. Order Value", value: "$48.22", change: "+3%" },
          ].map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      metric.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {metric.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="chart-wrapper mx-auto flex flex-col flex-wrap items-start justify-center gap-6  sm:flex-row ">
          {/* Overview Goes */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Total Revenue
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Subscriptions
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>

              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Sales</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <path d="M2 10h20"></path>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Active Now
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </div>
            </div>
          </div>
          {/* Overview End */}

          <div className="grid w-full gap-6">
            {/* Full CHart Goes Here */}
            <Card>
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                  <CardTitle>Order Statistics</CardTitle>
                  <CardDescription>
                    Showing total visitors for the last 3 months
                  </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger
                    className="w-[160px] rounded-lg sm:ml-auto"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="Last 3 months" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="90d" className="rounded-lg">
                      Last 3 months
                    </SelectItem>
                    <SelectItem value="30d" className="rounded-lg">
                      Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-lg">
                      Last 7 days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-desktop)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-desktop)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillMobile"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-mobile)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-mobile)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                          indicator="dot"
                        />
                      }
                    />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="url(#fillMobile)"
                      stroke="var(--color-mobile)"
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="url(#fillDesktop)"
                      stroke="var(--color-desktop)"
                      stackId="a"
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            {/* Full Chart End Here */}
            {/* Order detail Goes Here */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Total Amount
                  </h3>
                  <Receipt />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold mb-2">$45,231.89</div>
                  <p className="text-xs text-muted-foreground text-[#279C8F] font-bold">
                    10% Increase
                  </p>
                </div>
              </div>
              {/* Total Amount End */}

              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    New Orders
                  </h3>
                  <PackagePlus />
                </div>

                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold mb-2">+2.6K</div>
                  <p className="text-xs text-muted-foreground text-[#279C8F] font-bold">
                    50% Increase
                  </p>
                </div>
              </div>
              {/* New Order End */}

              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Received Orders
                  </h3>
                  <HandCoins />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold mb-2">+12.6K</div>
                  <p className="text-xs text-muted-foreground text-[#279C8F] font-bold">
                    50% Increase
                  </p>
                </div>
              </div>
              {/* Received Order End */}

              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Reviews
                  </h3>
                  <Star />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold mb-2">+476</div>
                  <p className="text-xs text-muted-foreground text-[#E1201D] font-bold">
                    -5% Decrease
                  </p>
                </div>
              </div>
              {/* Reviews End */}

              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    New Reach
                  </h3>
                  <UserRoundPlus />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold mb-2">+476</div>
                  <p className="text-xs text-muted-foreground text-[#279C8F] font-bold">
                    +5% Decrease
                  </p>
                </div>
              </div>
              {/* User End */}

              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Successful Orders
                  </h3>
                  <UserRoundPlus />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold mb-2">+9.2K</div>
                  <p className="text-xs text-muted-foreground text-[#279C8F] font-bold">
                    +5% Decrease
                  </p>
                </div>
              </div>
              {/* Successful Order End */}
            </div>{" "}
            {/* Order detail End Here */}
            {/* Order History Goes  */}
            <div>
              <div className="my-4 ">
                <h2 className="text-3xl font-bold tracking-tight border-b-[0.5px] pb-4">
                  Order History
                </h2>
              </div>

              <Table>
                <TableCaption>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  nobis consectetur quas quo saepe.{" "}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Date </TableHead>
                    <TableHead>Status</TableHead>
                    {/* its paymentStatus  */}
                    <TableHead>Shipment</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>{" "}
                      {/* its paymentStatus  */}
                      <TableCell>{invoice.Shipment}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-4">
                          <Eye className="w-5 h-5 text-gray-500 hover:text-[#E1201D]" />
                          <Files className="w-5 h-5 text-gray-500 hover:text-[#E1201D]" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
              </Table>
            </div>
            {/* Order History End  */}
          </div>
        </div>
      </div>
    </DashboardContent>
  );
}

export default IndexPage;
