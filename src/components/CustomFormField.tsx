import { E164Number } from "libphonenumber-js/core";
import { Control, ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CalendarDays, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { FormFieldType } from "@/constants/form";
import { cn } from "@/lib/utils";
import TipTapEditor from "./TipTapEditor";

interface CustomProps {
  control: Control<any>;
  name: string;
  maxLength?: number;
  className?: string;
  isLoading?: boolean;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal" | "none";
  label?: string | React.ReactNode;
  placeholder?: string;
  icon?: React.ReactNode;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "date"
    | "phone"
    | "url"
    | "search"
    | "tel"
    | "numeric"
    | "decimal"
    | "none";
}

const RenderInput = ({
  field,
  props,
}: {
  field: ControllerRenderProps;
  props: CustomProps;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border-input relative">
          {props.icon && (
            <div className="flex items-center p-2">{props.icon}</div>
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={props.placeholder}
              maxLength={props.maxLength}
              disabled={props.disabled || props.isLoading}
              defaultValue={props.value}
              type={props.type}
              className={cn("h-11", props.className)}
              inputMode={props.inputMode}
              onKeyDown={props.onKeyDown}
            />
          </FormControl>
          {props.isLoading && (
            <div className="top-1/2 absolute -translate-y-1/2 right-2 flex items-center gap-1">
              <p className="font-semibold text-sm">Checking</p>
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            </div>
          )}
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className={cn("h-32", props.className)}
            disabled={props.disabled}
            maxLength={props.maxLength}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            countries={["US", "CA", "IN"]}
            placeholder={props.placeholder}
            addInternationalOption={false}
            // withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="h-11 border-input border rounded-md px-2 group"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-x-2">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="cursor-pointer">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex gap-1 items-center w-full">
          <CalendarDays size={25} />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker fullinput"
              className="border-input border rounded-md px-3 h-11 text-sm w-full"
              placeholderText={props.placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            // defaultValue={field.value}
            disabled={props.disabled}
          >
            <FormControl>
              <SelectTrigger className="h-11  focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-input">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FormFieldType.PASSWORD_INPUT:
      return (
        <div className="relative flex rounded-md border-input">
          <FormControl>
            <>
              <Input
                placeholder={props.placeholder}
                {...field}
                type={showPassword ? "text" : "password"}
                maxLength={props.maxLength}
                autoComplete="current-password"
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-0 h-full px-3 pe-2 hover:bg-transparent"
                type="button"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </>
          </FormControl>
        </div>
      );

    case FormFieldType.EMAIL_INPUT:
      return (
        <div className="flex rounded-md border-input">
          {props.icon && (
            <div className="flex items-center p-1"> {props.icon}</div>
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              type="email"
              {...field}
              maxLength={props.maxLength}
              className="h-11"
              autoComplete="email"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXT_EDITOR:
      return (
        <div className="flex rounded-md border-input border">
          {props.icon && (
            <div className="flex items-center p-1"> {props.icon}</div>
          )}
          <FormControl>
            <TipTapEditor
              {...field}
              placeholder={props.placeholder}
              className={cn("h-11", props.className)}
              description={field.value}
              onChange={field.onChange}
            />
          </FormControl>
        </div>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
