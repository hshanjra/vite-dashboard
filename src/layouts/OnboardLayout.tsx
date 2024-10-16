import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function OnboardLayout() {
  const { handleLogout, currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      // Navigate to login if user is not authenticated
      navigate("/auth/login", { replace: true });
    }
    // If seller is verified or verification is pending, redirect to dashboard
    if (
      currentUser?.merchantVerificationStatus === "VERIFIED" ||
      currentUser?.merchantVerificationStatus === "PENDING"
    ) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  // Handle loading state
  if (currentUser === undefined) {
    return null;
  }

  // TODO: Add onboarding logic, handle routes if user is not onboard
  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/assets/bg-gradient-2.svg')] bg-center bg-cover relative">
      <header className="w-full px-10 py-3 ">
        <nav className="flex flex-row items-center content-center justify-between">
          <img src="/logo.png" className="h-14" />
          {/* <h4 className="text-xl font-bold">BYP</h4>
          <span className="text-lg">SellerZone</span> */}
          <Link
            to={"#"}
            onClick={handleLogout}
            className=" text-lg hover:underline hover:text-primary"
          >
            Log out
          </Link>
        </nav>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <CircleUser />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-6 w-6" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </header>
      <Outlet />

      <footer className="mt-auto px-10 py-3">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} BYP, All rights reserved.
        </p>
      </footer>
    </main>
  );
}
