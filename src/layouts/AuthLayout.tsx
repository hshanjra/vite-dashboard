import { useAuth } from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [navigate, currentUser]);

  return (
    <>
      {/* Header  */}
      {/* <header>Auth Header</header> */}
      <main>
        <Outlet />
      </main>
      {/* <footer>Auth Footer</footer> */}
      {/* Footer  */}
      <Toaster />
    </>
  );
}

export default AuthLayout;
