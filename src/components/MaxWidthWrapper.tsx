import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-4 md:px-15",
        className
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
