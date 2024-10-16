import { Info } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button } from "../ui/button";

function EmailNotVerified() {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col md:flex-row items-center justify-center border rounded-xl bg-destructive/5 border-destructive p-4 gap-2">
        <Info size={20} className="text-destructive" />
        <p className="text-destructive font-semibold text-sm tracking-wide">
          Your email is not verified. Please check your email for verification
          link. Did not received a verification email?{" "}
        </p>
        <Button size={"sm"} className="rounded-xl">
          Resend email{" "}
        </Button>
      </section>
    </MaxWidthWrapper>
  );
}

export default EmailNotVerified;
