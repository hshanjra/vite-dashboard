import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="inline-flex items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-primary font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
