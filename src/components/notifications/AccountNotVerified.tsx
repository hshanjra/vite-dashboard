import { Info } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button } from "../ui/button";

function AccountNotVerified() {
  return (
    <MaxWidthWrapper className="">
      <div className=" border rounded-xl bg-green-500/5 border-green-500 p-4 gap-2">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <Info size={20} className="text-green-500" />
          <h3 className="text-xl font-semibold leading-6 text-green-500">
            Account Verification
          </h3>
        </div>
        <div className="flex items-center justify-center flex-col mt-5 space-y-5 max-w-md mx-auto">
          <p className="text-green-500  text-sm tracking-wide text-center">
            Your account verification is pending. Please wait for a while. Most
            of the time it takes less than 12 hours.
            <br /> If it takes longer than that, please contact support.
          </p>

          <Button size={"sm"} className="rounded-xl">
            Contact Support{" "}
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default AccountNotVerified;
