import api from "@/lib/api";
import { Category, Metadata, Product } from "@/types";
import {
  OnboardingFormData,
  OnboardingSchema,
} from "@/validators/onboarding-validator";
import {
  createProductSchema,
  CreateProductSchemaType,
  updateProductSchema,
  UpdateProductSchemaType,
} from "@/validators/product-validator";

// Query to check if store with same slug exists
export async function checkStoreExists(
  slug: string
): Promise<boolean | undefined> {
  if (!slug) return;
  try {
    const { data } = await api.get(`/seller/store/${slug}`);
    if (data) return true;
  } catch (error: any) {
    if (error.status === 404) return false;
    return;
  }
}

// Seller onboard
export async function createSellerStore(v: OnboardingFormData) {
  const values = OnboardingSchema.parse(v);
  const formData: FormData = new FormData();

  // Append identity documents (files) if they exist
  if (values.identityDocs && values.identityDocs.length > 0) {
    values.identityDocs.forEach((file) => {
      formData.append("identityDocs", file); // Ensure the key matches backend expectations
    });
  }

  // Append other fields to FormData
  formData.append("displayName", values.displayName);
  formData.append("businessAddress[streetAddress]", values.street);
  formData.append("businessAddress[city]", values.city);
  formData.append("businessAddress[state]", values.state);
  formData.append("businessAddress[zipCode]", values.zip);
  formData.append("businessAddress[country]", "US");
  formData.append("accountType", values.accountType);
  formData.append("aboutSeller", values.about || "");
  formData.append("returnPolicyTerms", values.returnPolicy || "");
  formData.append("shippingPolicyTerms", values.shippingPolicy || "");
  formData.append("bankAccountType", values.bankAccountType);
  formData.append("bankName", values.bankName);
  formData.append("accountHolderName", values.accountHolderName);
  formData.append("accountNumber", values.accountNumber?.toString() || "");
  formData.append("routingNumber", values.routingNumber?.toString() || "");
  formData.append("bankBic", values.bankBic || "");
  formData.append("bankIban", values.bankIban || "");
  formData.append("bankSwiftCode", values.bankSwiftCode || "");
  formData.append("bankAddress", values.bankAddress);

  // Append individual fields if accountType is INDIVIDUAL
  if (values.accountType === "INDIVIDUAL") {
    formData.append("SSN", values.ssn?.toString() || "");
    formData.append(
      "dateOfBirth",
      values.dateOfBirth ? values.dateOfBirth.toString() : ""
    ); // Convert to ISO string for consistency
  }

  // Append business fields if accountType is BUSINESS
  if (values.accountType === "BUSINESS") {
    formData.append("EIN", values?.ein?.toString() || "");
    formData.append("businessName", values.businessName || "");
    formData.append("businessEmail", values.businessEmail || "");
    formData.append("businessPhone", values.businessPhone?.toString() || "");
    // formData.append("businessLicense", values.businessLicense || "");
    // formData.append(
    //   "businessLicenseExp",
    //   values.businessLicenseExp?.toString() || ""
    // );
  }

  try {
    // make request to create store
    const { data: store } = await api.post("/seller/onboard", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (store) return true;
  } catch (error: any) {
    console.log(error);
    if (error.status === 409) {
      throw new Error("Store with the same name already exists");
    }

    if (error.status === 400) {
      throw new Error(error.message);
    }

    throw error;
  }
}

// Get all products
export async function getProducts({
  status,
  page,
  limit,
}: {
  status?: "ACTIVE" | "INACTIVE";
  page?: number;
  limit?: number;
}): Promise<Product[]> {
  try {
    const safePage = page || 1;
    const safeLimit = limit || 30;
    const safeStatus = status || "ALL";

    const { data } = await api.get(
      `/seller/products?status=${safeStatus}&page=${safePage}&limit=${safeLimit}`
    );
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await api.get("/category");
    return data;
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Get compatible metadata
export async function getCompatibleMetadata(): Promise<Metadata[]> {
  const { data } = await api.get<Metadata[]>("/products/compatible-metadata");

  return data;
}

// Create Product
export async function createProduct(
  values: CreateProductSchemaType
): Promise<Product> {
  const v = createProductSchema.parse(values);

  const formData = buildProductFormData(v);

  try {
    const { data } = await api.post("/seller/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    console.log(error);
    if (error.status === 400) {
      throw new Error("Please check all fields");
    }
    throw new Error("Something went wrong");
  }
}

// Get Product
export async function getSingleProduct(
  productId: string
): Promise<Product | null> {
  if (!productId) return null;
  try {
    const { data } = await api.get(`/seller/products/${productId}`);
    return data;
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error("Product not found");
    }

    throw new Error("Something went wrong");
  }
}

// Update Product
export async function updateProduct({
  productId,
  values,
}: {
  productId: string;
  values: UpdateProductSchemaType;
}): Promise<Product> {
  const v = updateProductSchema.parse(values);

  const formData = buildProductFormData(v);
  try {
    const { data } = await api.patch(
      `/seller/products/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error.status === 400) {
      throw new Error("Please check all fields");
    }
    throw new Error("Something went wrong");
  }
}

// Delete Product
export async function deleteProduct(productId: string): Promise<boolean> {
  try {
    await api.delete(`/seller/products/${productId}`);
    return true;
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error("Error deleting product");
  }
}

// Delete A Product Image
export async function deleteProductImage({
  productId,
  imageURL,
}: {
  productId: string;
  imageURL: string;
}): Promise<boolean> {
  try {
    await api.delete(`/seller/products/delete-image`, {
      data: {
        productId,
        imageURL,
      },
    });
    return true;
  } catch (error: any) {
    console.log(error);
    if (error.status === 404) {
      throw new Error("Product not found");
    }

    if (error.status === 400) {
      throw new Error(error.message);
    }
    throw new Error("Error deleting image");
  }
}

// Build Product Details
export function buildProductFormData(v: CreateProductSchemaType) {
  const formData: FormData = new FormData();

  // Append images if they exist
  if (v.images && v.images.length > 0) {
    v.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  // Append other fields to FormData
  formData.append("productTitle", v.productTitle);
  formData.append("productBrand", v.productBrand);
  formData.append("shortDescription", v.shortDescription);
  formData.append("longDescription", v.longDescription);
  formData.append("keywords", v.keywords);
  formData.append("partNumber", v.partNumber);
  formData.append("sku", v.sku);
  formData.append("productLength", v.productLength.toString());
  formData.append("productWidth", v.productWidth.toString());
  formData.append("productHeight", v.productHeight.toString());
  formData.append("productWeight", v.productWeight.toString());
  formData.append("categoryId", v.category);
  if (v.subCategory) {
    formData.append("subCategoryId", v.subCategory);
  }
  formData.append("metaTitle", v.metaTitle);
  formData.append("metaDescription", v.metaDescription);
  formData.append("productStock", v.productStock.toString());
  formData.append("regularPrice", v.regularPrice.toString());
  formData.append("salePrice", v.salePrice.toString());
  formData.append(
    "shippingPrice",
    v.shippingPrice && v.shippingPrice >= 0 ? v.shippingPrice.toString() : "0"
  );
  formData.append("productCondition", v.productCondition);
  formData.append("isActive", v.isActive === "ACTIVE" ? "true" : "false");
  formData.append(
    "isGenericProduct",
    v.isGenericProduct === true ? "true" : "false"
  );

  if (!v.isGenericProduct) {
    formData.append("compatibleMake", v.compatibleMake);
    if (v.compatibleModels) {
      v.compatibleModels.forEach((model) => {
        formData.append("compatibleModel[]", model);
      });
    }

    if (v.compatibleSubModels) {
      v.compatibleSubModels.forEach((submodel) => {
        formData.append("compatibleSubModel[]", submodel);
      });
    }

    if (v.compatibleYears) {
      v.compatibleYears.forEach((year) => {
        formData.append("compatibleYear[]", year.toString());
      });
    }
  }

  return formData;
}
