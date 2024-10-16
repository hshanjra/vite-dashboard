import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/constants/form";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "@/validators/auth-validator";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RegisterPage() {
  const navigate = useNavigate();
  const { currentUser, handleRegister } = useAuth();
  const { toast } = useToast();

  if (currentUser) {
    navigate("/", { replace: true });
  }

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: handleRegister,
    onSuccess: () => {
      toast({
        title: "Account created",
        description: "We've created an account for you. Check your email.",
        variant: "success",
      });
      navigate("/onboard", { replace: true });
    },
  });

  const handleRegisterSubmit = async (values: RegisterSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegisterSubmit)}
          className="flex items-center justify-center py-12"
        >
          <div>
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Seller Register</h1>
                <p className="text-balance text-muted-foreground">
                  Fill the form below to create a seller account
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

              {/* Success */}
              {mutation.isSuccess && (
                <div className="p-2  bg-green-100 rounded-md">
                  <div className="flex gap-2 items-center">
                    <Info size={20} className="text-success" />
                    <p className="text-success text-sm">
                      Please check your email inbox to verify your account.
                    </p>
                  </div>
                </div>
              )}

              {/* First name / Last name */}
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Max"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Robinson"
                  />
                </div>

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

                  {/* Terms */}
                  <div className="text-sm">
                    <CustomFormField
                      control={form.control}
                      name="terms"
                      fieldType={FormFieldType.CHECKBOX}
                      label={
                        <>
                          By signing up, you agree to our{" "}
                          <a href="#" className="hover:underline text-blue-600">
                            Terms of Use
                          </a>{" "}
                          and{" "}
                          <a href="#" className="hover:underline text-blue-600">
                            Privacy Policy
                          </a>
                        </>
                      }
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Registering..." : "Register"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/login" className="underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <div className="hidden bg-muted lg:block">
        <img
          src="/assets/image-01.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full max-h-[800px] object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default RegisterPage;
