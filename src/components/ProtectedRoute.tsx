import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Roles } from "@/enums";
import { useNavigate } from "react-router-dom";
import ParentLoader from "./ParentLoader";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      // Navigate to login if user is not authenticated
      navigate("/auth/login", { replace: true });
    }
    if (
      currentUser &&
      !currentUser?.roles?.some((role) => role.includes(Roles.SELLER))
    ) {
      // Navigate to onboarding if user not have a seller role
      navigate("/onboard", { replace: true });
    }
  }, [currentUser, navigate]);

  // Handle loading state
  if (currentUser === undefined || currentUser === null) {
    return <ParentLoader />;
  }

  // TODO: check this logic on onboarding page
  //   If user email is not verified
  // if (currentUser.isEmailVerified === false) {
  //   return <EmailNotVerified />;
  // }

  // Handle unauthorized access for non-sellers
  // if (
  //   currentUser &&
  //   !currentUser.roles.some((role) => role.includes(Roles.SELLER))
  // ) {
  //   return <div>Unauthorized</div>;
  // }

  // If all checks pass, render children
  return children as ReactNode;
}
