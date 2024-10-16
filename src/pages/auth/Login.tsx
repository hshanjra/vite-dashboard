import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/constants/form";
import { LoginSchema, LoginSchemaType } from "@/validators/auth-validator";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { Info } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleLoginSubmit = async (values: LoginSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLoginSubmit)}
          className="flex items-center justify-center py-12"
        >
          <div>
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Seller Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your credentials below to login to your account
                </p>
              </div>

              {/* Errors */}
              {mutation.isError && (
                <div className="p-2  bg-destructive/10 rounded-md">
                  <div className="flex gap-2 items-center">
                    <Info size={16} className="text-destructive" />
                    <p className="text-destructive text-sm">
                      {mutation.error.message}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <CustomFormField
                    fieldType={FormFieldType.EMAIL_INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD_INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                  />
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/auth/register" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <div className="hidden bg-muted lg:block">
        <img
          src="/assets/image-02.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full max-h-[800px] w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default LoginPage;
