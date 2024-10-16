import { z } from "zod";

export const createProductSchema = z
  .object({
    productTitle: z
      .string()
      .min(1, "Product title is required")
      .max(200, "Product title is too long"),
    metaTitle: z
      .string()
      .min(1, "Meta title is required")
      .max(60, "Meta title is too long"),
    metaDescription: z
      .string()
      .min(1, "Meta description is required")
      .max(160, "Meta description is too long"),
    productBrand: z
      .string()
      .min(1, "Brand name is required")
      .max(50, "Brand name is too long"),
    shortDescription: z
      .string()
      .min(1, "Short description is required")
      .max(500, "Short description is too long"),

    longDescription: z
      .string()
      .min(1, "Long description is required")
      .max(1500, "Long description is too long"),

    keywords: z
      .string()
      .min(1, "Keywords are required")
      .max(50, "Keywords are too long"),
    partNumber: z
      .string()
      .min(1, "Part number is required")
      .max(50, "Part number is too long"),

    sku: z.string().max(20, "SKU is too long"),
    productLength: z.coerce
      .number()
      .positive("Length must be greater than 0")
      .min(1, "Enter length"),
    productWidth: z.coerce
      .number()
      .positive("Width must be greater than 0")
      .min(1, "Width is required"),
    productHeight: z.coerce
      .number()
      .positive("Height must be greater than 0")
      .min(1, "Height is required"),
    productWeight: z.coerce
      .number()
      .positive("Weight must be greater than 0")
      .min(1, "Weight is required"),
    shippingPrice: z.coerce
      .number()
      .min(0, "Shipping price must be greater than 0")
      .max(100, "Shipping price must be less than $100")
      .optional(),
    category: z.string().min(1, "Please select a category"),
    subCategory: z.string().optional(),
    productStock: z.coerce
      .number({ message: "Please enter a valid stock" })
      .min(0, "Please enter a valid stock")
      .max(100, "Max 100"),
    regularPrice: z.coerce
      .number({ message: "Please enter price" })
      .positive()
      .min(1, "Please enter price"),
    salePrice: z.coerce
      .number({ message: "Please enter price" })
      .positive()
      .min(1, "Please enter price"),
    images: z.custom<File[]>(),
    productCondition: z
      .enum(["NEW", "USED", "REFURBISHED"], {
        message: "Please select condition from the list",
      })
      .default("NEW"),
    isActive: z.enum(["ACTIVE", "INACTIVE"], {
      message: "Please select status from the list",
    }),
    isGenericProduct: z.coerce.boolean().default(false),
    compatibleMake: z.string(),
    compatibleModels: z.array(z.string()),
    compatibleSubModels: z.array(z.string()),
    //   compatibleEngine: z.array(z.string().min(1, "Please select a engine")),
    compatibleYears: z.array(z.number()),
  })
  .superRefine((data, ctx) => {
    if (!data.images || data.images.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Please upload at least one image",
        path: ["images"],
      });
    }

    // Check if sale price is greater than regular price
    if (data.salePrice && data.salePrice >= data.regularPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Sale price cannot be greater than or equal to regular price",
        path: ["salePrice"],
      });
    }

    if (!data.isGenericProduct) {
      // Make / Models / Submodels / Years validation
      if (!data.compatibleMake) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a make",
          path: ["compatibleMake"],
        });
      }
      if (!data.compatibleModels || data.compatibleModels.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select at least one model",
          path: ["compatibleModels"],
        });
      }

      if (!data.compatibleSubModels || data.compatibleSubModels.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select at least one sub model",
          path: ["compatibleSubModels"],
        });
      }

      if (!data.compatibleYears || data.compatibleYears.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select at least one year",
          path: ["compatibleYears"],
        });
      }
    }
  });

export type CreateProductSchemaType = z.infer<typeof createProductSchema>;

export const updateProductSchema = z
  .object({
    productTitle: z
      .string()
      .min(1, "Product title is required")
      .max(200, "Product title is too long"),
    metaTitle: z
      .string()
      .min(1, "Meta title is required")
      .max(60, "Meta title is too long"),
    metaDescription: z
      .string()
      .min(1, "Meta description is required")
      .max(160, "Meta description is too long"),
    productBrand: z
      .string()
      .min(1, "Brand name is required")
      .max(50, "Brand name is too long"),
    shortDescription: z
      .string()
      .min(1, "Short description is required")
      .max(500, "Short description is too long"),

    longDescription: z
      .string()
      .min(1, "Long description is required")
      .max(1500, "Long description is too long"),

    keywords: z
      .string()
      .min(1, "Keywords are required")
      .max(50, "Keywords are too long"),
    partNumber: z
      .string()
      .min(1, "Part number is required")
      .max(50, "Part number is too long"),

    sku: z.string().max(20, "SKU is too long"),
    productLength: z.coerce
      .number()
      .positive("Length must be greater than 0")
      .min(1, "Enter length"),
    productWidth: z.coerce
      .number()
      .positive("Width must be greater than 0")
      .min(1, "Width is required"),
    productHeight: z.coerce
      .number()
      .positive("Height must be greater than 0")
      .min(1, "Height is required"),
    productWeight: z.coerce
      .number()
      .positive("Weight must be greater than 0")
      .min(1, "Weight is required"),
    shippingPrice: z.coerce
      .number()
      .min(0, "Shipping price must be greater than 0")
      .max(100, "Shipping price must be less than $100")
      .optional(),
    category: z.string().min(1, "Please select a category"),
    subCategory: z.string().optional(),
    productStock: z.coerce
      .number({ message: "Please enter a valid stock" })
      .min(0, "Please enter a valid stock")
      .max(100, "Max 100"),
    regularPrice: z.coerce
      .number({ message: "Please enter price" })
      .positive()
      .min(1, "Please enter price"),
    salePrice: z.coerce
      .number({ message: "Please enter price" })
      .positive()
      .min(1, "Please enter price"),
    images: z.custom<File[]>(),
    productCondition: z
      .enum(["NEW", "USED", "REFURBISHED"], {
        message: "Please select condition from the list",
      })
      .default("NEW"),
    isActive: z.enum(["ACTIVE", "INACTIVE"], {
      message: "Please select status from the list",
    }),
    isGenericProduct: z.coerce.boolean().default(false),
    compatibleMake: z.string(),
    compatibleModels: z.array(z.string()),
    compatibleSubModels: z.array(z.string()),
    //   compatibleEngine: z.array(z.string().min(1, "Please select a engine")),
    compatibleYears: z.array(z.number()),
  })
  .superRefine((data, ctx) => {
    // if (!data.images || data.images.length === 0) {
    //   ctx.addIssue({
    //     code: "custom",
    //     message: "Please upload at least one image",
    //     path: ["images"],
    //   });
    // }

    // Check if sale price is greater than regular price
    if (data.salePrice && data.salePrice >= data.regularPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Sale price cannot be greater than or equal to regular price",
        path: ["salePrice"],
      });
    }

    if (!data.isGenericProduct) {
      // Make / Models / Submodels / Years validation
      if (!data.compatibleMake) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a make",
          path: ["compatibleMake"],
        });
      }
      if (!data.compatibleModels || data.compatibleModels.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select at least one model",
          path: ["compatibleModels"],
        });
      }

      if (!data.compatibleSubModels || data.compatibleSubModels.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select at least one sub model",
          path: ["compatibleSubModels"],
        });
      }

      if (!data.compatibleYears || data.compatibleYears.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select at least one year",
          path: ["compatibleYears"],
        });
      }
    }
  });

export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>;
