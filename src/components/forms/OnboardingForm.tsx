import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingFormData,
  OnboardingSchema,
} from "@/validators/onboarding-validator";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  CircleX,
  House,
  Link,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Form, FormControl, FormLabel } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/constants/form";
import {
  AccountTypeOptions,
  OnboardingFormDefaultValues,
  US_STATES,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";
import FileUploader from "../FileUploader";
import { cn, generateSlug } from "@/lib/utils";
import { Input } from "../ui/input";
import { checkStoreExists, createSellerStore } from "@/http";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";

type Inputs = OnboardingFormData;
const steps = [
  {
    id: "Step 1",
    name: "Seller Account Creation",
    fields: [],
  },

  {
    id: "Step 2",
    name: "Business Information",
    fields: [
      "accountType",
      "businessName",
      "businessLicense",
      "businessLicenseExp",
      "ein",
      "businessEmail",
      "businessPhone",
      "dateOfBirth",
      "ssn",
      "street",
      "city",
      "state",
      "zip",
      "country",
      "identityDocs",
    ],
  },
  {
    id: "Step 3",
    name: "Store Setup",
    fields: ["displayName", "about", "returnPolicy", "shippingPolicy"],
  },

  {
    id: "Step 4",
    name: "Bank Details",
    fields: [
      "bankAccountType",
      "accountHolderName",
      "bankName",
      "accountNumber",
      "routingNumber",
      "bankBic",
      "bankIban",
      "bankSwiftCode",
      "bankAddress",
      "bankTerms",
    ],
  },
  { id: "Step 5", name: "Submit Application", fields: [] },
];

function OnboardingForm() {
  // Toast
  const { toast } = useToast();

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [storeSlug, setStoreSlug] = useState<string>("");
  const [storeAvailability, setStoreAvailability] = useState<boolean>(true); // State to track store availability

  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: OnboardingFormDefaultValues,
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: createSellerStore,
    // onSuccess: () => {
    //   // navigate("/", { replace: true });
    // },

    onError: (err) => {
      if (err instanceof Error) {
        toast({
          description: err.message,
          title: "Error",
          variant: "destructive",
        });
      }
    },
  });

  // Form elements
  const accountType = form.watch("accountType");
  const storeName = form.watch("displayName");

  // Function to check if the store with the same slug exists
  const StoreExists = useCallback(async () => {
    if (!storeSlug) return;

    const exists = await checkStoreExists(storeSlug);
    if (exists) {
      setStoreAvailability(false);
      toast({
        description: "Store with the same name already exists",
        title: "Error",
        variant: "destructive",
      });
    } else {
      setStoreAvailability(true);
    }
  }, [storeSlug, toast]);

  // const debouncedUpdateQuery = _.debounce(StoreExists, 400);

  // Debounce the StoreExists function
  const debouncedStoreExistsQuery = useCallback(
    () => StoreExists(),
    [StoreExists]
  );

  // useEffect for handling store name changes and calling debounced function
  useEffect(() => {
    if (storeName) {
      setStoreAvailability(true);
      const generatedSlug = generateSlug(storeName);
      setStoreSlug(generatedSlug);
    }
  }, [storeName]);

  const processForm: SubmitHandler<Inputs> = (values: OnboardingFormData) => {
    mutation.mutate(values);
    // form.reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 3) {
        await debouncedStoreExistsQuery();
        // Check for availability of store errors
        if (storeAvailability === false) {
          return;
        }

        // await form.handleSubmit(processForm)();
      }
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="flex flex-col justify-between bg-white relative">
      {/* steps */}
      <nav
        aria-label="Progress"
        className={cn(
          "sm:shadow-[0px_0px_22px_0px_#00000024] sm:p-5 rounded-xl sm:absolute sm:-top-14 bg-white w-full",
          {
            hidden: mutation.isSuccess || mutation.isError,
          }
        )}
      >
        <ol
          role="list"
          className="space-y-4 list-none md:flex md:space-x-8 md:space-y-0"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full gap-2 border-l-4 items-center text-sky-600 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  {/* <span className="text-sm font-medium text-sky-600 transition-colors">
                    {step.id}
                  </span> */}
                  <CircleCheck />
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div className="group flex w-full gap-2 border-l-4 items-center text-sky-600 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  {/* <span className="text-sm font-medium text-sky-600 transition-colors">
                    {step.id}
                  </span> */}
                  {/* <input type="radio" defaultChecked className=" h-5 w-5" /> */}
                  <RadioGroup>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="default"
                        checked
                        className="text-sky-600 border-sky-600 h-5 w-5"
                      />
                      <span>{step.name}</span>
                    </div>
                  </RadioGroup>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  {/* <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span> */}
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {/* <Separator className="mt-5" /> */}

      {/* Form */}
      <div className="mt-8 py-8 overflow-hidden">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(processForm)}
            autoComplete="off"
            className="px-2"
          >
            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center flex-col gap-2 bg-slate-50 mb-3 border max-w-md mx-auto py-3 px-3 rounded-xl">
                  <h3 className="text-md capitalize tracking-wide font-semibold">
                    Select An Account Type
                  </h3>
                  <CustomFormField
                    control={form.control}
                    name="accountType"
                    fieldType={FormFieldType.SKELETON}
                    renderSkeleton={(field) => (
                      <FormControl>
                        <RadioGroup
                          className="flex gap-6 items-center justify-center"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {AccountTypeOptions.map((option) => (
                            <div
                              key={option}
                              className="flex items-center gap-2"
                            >
                              <RadioGroupItem value={option} id={option} />
                              <Label
                                htmlFor={option}
                                className="cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </div>

                {accountType === "BUSINESS" && (
                  <h3 className="text-base font-semibold leading-7 text-gray-900 text-center">
                    Continue to register as a business, or if you plan to sell a
                    large number of goods.
                  </h3>
                )}

                <Separator className="my-5 opacity-30" />

                <div className="rounded overflow-hidden p-4 bg-gray-100">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    1. {accountType === "INDIVIDUAL" ? "Personal" : "Business "}
                    Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Provide your <span></span>
                    {accountType === "INDIVIDUAL" ? "personal" : "business "}
                    <span></span> details.
                  </p>
                </div>

                {/* Individual */}
                {accountType === "INDIVIDUAL" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="ssn"
                          label="Social Security Number (SSN)*"
                          placeholder="123-45-6789"
                          maxLength={9}
                          className="uppercase"
                        />
                      </div>

                      <div className="sm:col-span-3 ">
                        <CustomFormField
                          fieldType={FormFieldType.DATE_PICKER}
                          control={form.control}
                          name="dateOfBirth"
                          label="Date of Birth"
                          placeholder="Select Date"
                          className="w-full"
                        />
                      </div>

                      {/* <div className="sm:col-span-3"></div> */}
                    </div>
                  </motion.div>
                )}

                {/* Business */}

                {accountType === "BUSINESS" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="mt-4">
                      <div className="grid gap-4">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
                          <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="businessName"
                            label="Legal Business Name*"
                            placeholder="Your Legal Business Name"
                          />{" "}
                          {/* Business Name/EIN */}
                          <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="ein"
                            label="Employer Identification Number (EIN)*"
                            placeholder="12-3456789"
                            maxLength={9}
                            inputMode="numeric"
                          />
                        </div>{" "}
                        {/* Business Name/EIN */}
                      </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      {/* Business Name/EIN */}

                      {/* <div className="col-span-full">
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="businessName"
                          label="Legal Business Name*"
                          placeholder="Your Legal Business Name"
                        /> 
                      </div> */}
                      {/* EIN */}
                      {/* Business License */}
                      {/* <div className="sm:col-span-3">
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="businessLicense"
                          label="Business License Number (optional)"
                          placeholder="123-456-789"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <CustomFormField
                          fieldType={FormFieldType.DATE_PICKER}
                          control={form.control}
                          name="businessLicenseExp"
                          label="Business License Expiration Date (optional)"
                          placeholder="Select Date"
                        />
                      </div> */}

                      {/* EIN */}
                      {/* <div className="col-span-full">
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="ein"
                          label="Employer Identification Number (EIN)*"
                          placeholder="12-3456789"
                          maxLength={9}
                          inputMode="numeric"
                        />
                      </div> */}

                      {/* Business Email and Phone Number */}
                      <div className="sm:col-span-3">
                        <CustomFormField
                          fieldType={FormFieldType.EMAIL_INPUT}
                          control={form.control}
                          name="businessEmail"
                          label="Business Email*"
                          placeholder="Enter business email"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <CustomFormField
                          fieldType={FormFieldType.PHONE_INPUT}
                          control={form.control}
                          name="businessPhone"
                          label="Business Phone*"
                          placeholder="Enter business phone"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <Separator className="my-10 opacity-30" />

                {/* Identity Docs */}
                <div className="col-span-full ">
                  <div className="rounded overflow-hidden p-4 bg-gray-100 mb-5">
                    <h2
                      className={cn(
                        "text-base font-semibold leading-7 text-gray-900"
                      )}
                    >
                      2. Identification & verification*
                    </h2>
                    <p className="text-sm my-2">
                      Please upload scanned copy of your <b>identification</b>{" "}
                      or <b>business</b> documents (USA Passport, Driver's
                      License, Photo ID etc.) Max 3 files.
                    </p>
                  </div>
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="identityDocs"
                    renderSkeleton={(field) => (
                      <FormControl>
                        <FileUploader
                          onChange={field.onChange}
                          files={field.value}
                          options={{
                            maxFiles: 3,
                            accept: {
                              "image/png": [".png"],
                              "image/jpeg": [".jpeg", ".jpg"],
                            },
                          }}
                        />
                      </FormControl>
                    )}
                  />
                </div>

                <Separator className="my-10 opacity-30" />
                {/* Address fields */}
                <div>
                  <div className="rounded overflow-hidden p-4 bg-gray-100 mb-5">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      3. Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Address where you can receive mail.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="country"
                        label="Country*"
                        disabled={true}
                      >
                        <SelectItem value="United States">
                          <p>United States</p>
                        </SelectItem>
                      </CustomFormField>
                    </div>

                    <div className="col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="street"
                        label="Street address*"
                      />
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="city"
                        label="City*"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="state"
                        label="State*"
                        placeholder="Select a state"
                      >
                        {US_STATES.map((state, i) => (
                          <SelectItem key={i} value={state.value}>
                            <p>{state.name}</p>
                          </SelectItem>
                        ))}
                      </CustomFormField>
                    </div>

                    <div className="sm:col-span-2">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="zip"
                        label="ZIP / Postal code*"
                        inputMode="numeric"
                        placeholder="Your ZIP / Postal code"
                        maxLength={5}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="rounded overflow-hidden p-4 bg-gray-100">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Store Setup
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please provide information about your store.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="displayName"
                      label="Store Name*"
                      placeholder="XYZ Parts"
                      icon={<ShoppingBag />}
                    />

                    {storeName && storeAvailability === false && (
                      <div className="text-destructive flex items-center gap-2 mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">
                          Store with the same name already exists.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <FormLabel>Store address</FormLabel>
                    <div className="flex rounded-md border border-input mt-2">
                      <div className="flex items-center p-2">
                        <Link />
                      </div>
                      {/* TODO: add frontend url */}
                      <Input
                        name="storeAddress"
                        // disabled={true}
                        className="h-11 !cursor-pointer !border !border-input"
                        title="Click to copy"
                        value={`/seller/${storeSlug}`}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="about"
                      label="Enter about your store (This will visible on your store page)"
                      placeholder="We sell only genuine products"
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="shippingPolicy"
                      label="Define your shipping policy terms"
                      placeholder=""
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="returnPolicy"
                      label="Define your return policy terms"
                      placeholder=""
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bank Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* TODO: add debounce and check unique store name, if store is exists show error */}
                <div className="flex items-center flex-col gap-2 bg-slate-50 mb-3 border max-w-md mx-auto py-3 px-3 rounded-xl ">
                  {/* <div className="col-span-full"> */}
                  <FormLabel className="text-xl capitalize tracking-wide font-semibold">
                    Select Bank Account Type
                  </FormLabel>
                  <CustomFormField
                    control={form.control}
                    name="bankAccountType"
                    fieldType={FormFieldType.SKELETON}
                    renderSkeleton={(field) => (
                      <FormControl>
                        <RadioGroup
                          className="flex gap-6 items-center justify-center"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {AccountTypeOptions.map((option) => (
                            <div
                              key={option}
                              className="flex items-center gap-2"
                            >
                              <RadioGroupItem value={option} id={option} />
                              <Label
                                htmlFor={option}
                                className="cursor-pointer text-sm text-primary"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                  {/* </div> */}
                </div>

                <Separator className="my-5 opacity-30" />

                <div className="rounded overflow-hidden p-4 bg-gray-100">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Bank Details
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please fill the bank details to receive payments.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="accountHolderName"
                      label="Account Holder Name*"
                      placeholder=""
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="bankName"
                      label="Bank Name*"
                      placeholder=""
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="accountNumber"
                      label="Account Number*"
                      placeholder="123456789"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="routingNumber"
                      inputMode="numeric"
                      // disabled={true}
                      label="Bank Routing Number"
                      maxLength={9}
                      placeholder="007400078"
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="bankBic"
                      label="Bank BIC"
                      placeholder=""
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="bankIban"
                      label="Bank IBAN"
                      placeholder="BH75QGSP959B311711C75T"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="bankSwiftCode"
                      label="Bank Swift Code"
                      placeholder=""
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="bankAddress"
                      label="Bank address"
                      placeholder=""
                    />
                  </div>
                  {/* Terms */}
                  <div className="text-sm col-span-full">
                    <CustomFormField
                      control={form.control}
                      name="bankTerms"
                      fieldType={FormFieldType.CHECKBOX}
                      label="I attest that I am the owner and have full authorization to this bank account. Please double-check your account information! Incorrect or mismatched account name and number can result in withdrawal delays and fees."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-center flex-col items-center">
                  {/* Success message */}
                  {mutation.isSuccess && (
                    <div className="w-full rounded-lg p-4 sm:p-6 flex flex-col items-center">
                      <CircleCheck className="size-16 mb-2 text-sky-600 animate-bounce" />
                      <h3 className="text-xl font-semibold leading-6 text-sky-600">
                        Application Submitted Successfully!
                      </h3>
                      <p className="text-sm mt-2 text-center text-sky-600">
                        We'll notify you when your application is approved.
                        <br /> This usually takes less than 12 hours.
                      </p>

                      <Button
                        asChild
                        className="mt-5 bg-sky-600 hover:bg-sky-600/90 rounded-full"
                      >
                        <a href="/" className="flex items-center gap-x-2">
                          <House className="size-6" />
                          Go to dashboard
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* Error message */}
                  {mutation.isError && (
                    <div className="w-full rounded-lg p-4 sm:p-6 flex flex-col items-center">
                      <CircleX className="size-16 mb-2 text-destructive" />
                      <h3 className="text-xl font-semibold leading-6 text-destructive">
                        Oops, something went wrong
                      </h3>
                      <p className="text-sm mt-2 text-center text-destructive">
                        Try again, or
                        <br /> Contact our support if the problem persists.
                      </p>
                      <Button
                        asChild
                        className="mt-5 bg-destructive hover:bg-destructive/90 rounded-full"
                      >
                        <a
                          href="/support"
                          className="flex items-center gap-x-2"
                        >
                          <CircleHelp className="size-6" />
                          Contact Support
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* Loading */}
                  {mutation.isPending && (
                    <div className="w-full rounded-lg p-4 sm:p-6 flex flex-col items-center">
                      <Loader2 className="text-sky-600 animate-spin size-12" />
                      <h3 className="text-xl font-semibold leading-6 text-sky-600 mt-2">
                        Submitting your application...
                      </h3>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </form>
        </Form>

        {/* Navigation */}
        <div
          className={cn("mt-8 p-2", {
            hidden: currentStep === steps.length - 1,
          })}
        >
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={prev}
              disabled={
                currentStep === 1 || mutation.isSuccess || mutation.isPending
              }
              className="flex items-center"
            >
              <ChevronLeft />
              Back
            </Button>
            <Button
              type="button"
              onClick={next}
              disabled={
                currentStep === steps.length - 1 ||
                mutation.isSuccess ||
                mutation.isPending
              }
              className="rounded flex items-center"
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnboardingForm;
