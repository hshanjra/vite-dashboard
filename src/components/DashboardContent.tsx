import { cn } from "@/lib/utils";
import React from "react";
import { useAuth } from "./AuthProvider";
import EmailNotVerified from "./notifications/EmailNotVerified";
import AccountNotVerified from "./notifications/AccountNotVerified";

function DashboardContent({
  children,
  className,
  title,
  actionButtons,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actionButtons?: React.ReactNode;
}) {
  const { currentUser } = useAuth();

  // Check if current user email is verified or not
  if (currentUser?.isEmailVerified === false) {
    return <EmailNotVerified />;
  }

  // Check if user is verified as seller or not
  if (currentUser?.merchantVerificationStatus === "PENDING") {
    return <AccountNotVerified />;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        {title && (
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        )}

        {actionButtons && (
          <div className="flex items-center gap-2">{actionButtons}</div>
        )}
      </div>
      <div className={cn("flex flex-1", className)}>{children}</div>
    </section>
  );
}

export default DashboardContent;
