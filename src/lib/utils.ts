import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function generateSlug(str: string) {
  return slugify(str, { lower: true });
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "USD", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function formatDate(
  dateString: Date,
  options: { format: "short" | "numeric" | "long" } = { format: "long" }
) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const monthLong = date.toLocaleString("en-US", { month: "long" });
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const year = date.getUTCFullYear();

  switch (options.format) {
    case "short": // 27 Jun 2024
      return `${day} ${monthShort} ${year}`;
    case "numeric": // 27/06/2024
      return `${day}/${String(date.getUTCMonth() + 1).padStart(
        2,
        "0"
      )}/${year}`;
    case "long": // 27 June 2024
    default:
      return `${day} ${monthLong} ${year}`;
  }
}

export function getRecentYears(count: number = 30) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < count; i++) {
    years.push(currentYear - i);
  }

  return years;
}
