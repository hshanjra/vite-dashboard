import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SelectItem, SelectSeparator } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpToLineIcon, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import ProductImagesUploader from "../ProductImagesUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/constants/form";
import {
  updateProductSchema,
  UpdateProductSchemaType,
} from "@/validators/product-validator";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  updateProduct,
  getCategories,
  getSingleProduct,
  getCompatibleMetadata,
} from "@/http";
import {
  ProductConditionOptions,
  ProductsFormDefaultValues,
  ProductStatusOptions,
} from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { getRecentYears } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ParentLoader from "../ParentLoader";
import UploadedImagesPreview from "../UploadedImagesPreview";

interface CreateProductFormProps {
  title?: string;
  buttonTitle?: string;
}

function EditProductForm({ title, buttonTitle }: CreateProductFormProps) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();

  // Handle product error
  useEffect(() => {
    if (!productId) return navigate("/products", { replace: true });
  }, [navigate, productId]);

  // Get product
  const { data: product, error: productError } = useQuery({
    queryKey: ["product", productId],
    enabled: !!productId,
    queryFn: async () => await getSingleProduct(productId!),
  });

  // Product Form
  const form = useForm<UpdateProductSchemaType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: ProductsFormDefaultValues,
  });

  // Update form values when product data is loaded
  useEffect(() => {
    if (productError) return navigate("/products", { replace: true });

    if (product) {
      form.reset({
        isActive: product.isActive ? "ACTIVE" : "INACTIVE",
        isGenericProduct: product.isGenericProduct,
        productTitle: product.title,
        longDescription: product.longDescription,
        shortDescription: product.shortDescription,
        productBrand: product.brand,
        keywords: product.keywords,
        partNumber: product.partNumber,
        sku: product.sku,
        productLength: product.dimensions?.length ?? 0,
        productWidth: product.dimensions?.width ?? 0,
        productHeight: product.dimensions?.height ?? 0,
        productWeight: product.dimensions?.weight ?? 0,
        category: product.categories[0]?.id || "",
        subCategory: product.categories[1]?.id || "",
        productStock: product.availableStock ?? 0,
        regularPrice: product.regularPrice ?? 0,
        salePrice: product.salePrice ?? 0,
        shippingPrice: product.shippingPrice ?? 0,
        productCondition: product.condition ?? "NEW",
        metaTitle: product.metaTitle ?? "",
        metaDescription: product.metaDescription ?? "",
        compatibleMake: product?.compatibleMake ?? "",
        compatibleModels: product.compatibleModels ?? [],
        compatibleYears:
          product?.compatibleYears?.map((year) => Number(year)) ?? [],
        compatibleSubModels: product.compatibleSubModels ?? [],
      });
    }
  }, [product, form, productError, navigate]);

  // Mutation
  const mutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: updateProduct,
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `${data.title} updated successfully.`,
        variant: "success",
      });

      navigate("/products", { replace: true });
    },
  });

  const handleProductFormSubmit = async (values: UpdateProductSchemaType) => {
    if (!productId) return;
    mutation.mutate({ productId, values });
  };

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  // Fetch Compatible Metadata
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: async () => await getCompatibleMetadata(),
    refetchOnWindowFocus: false,
  });

  // Form Elements
  const selectedCategoryId = form.watch("category") as any;
  const isGenericProduct = form.watch("isGenericProduct");
  const selectedMake = form.watch("compatibleMake");
  const selectedModels = form.watch("compatibleModels");
  // const selectedSubmodels = form.watch("compatibleSubmodels");

  // Find the selected category
  const selectedCategory = categories?.find(
    (category) => category._id === selectedCategoryId
  );

  // Filter subcategories if available
  const subCategories =
    selectedCategory && selectedCategory?.subcategories.length > 0
      ? selectedCategory?.subcategories
      : [];

  /* COMPATIBILITY FIELDS */
  const getModels = () => {
    const make = metadata?.find((v) => v.make === selectedMake);
    return make ? make.models : [];
  };

  const getSubModels = () => {
    // Return submodels based on selected models
    const make = metadata?.find((v) => v.make === selectedMake);
    if (!make) return [];

    // Filter unique submodels
    const subModels = selectedModels
      .map((model) => {
        const subModel = make.models.find((m) => m.name === model);
        return subModel ? subModel.subModels : [];
      })
      .flat(); // Flatten the array if subModels are arrays within arrays

    const uniqueSubModels = Array.from(new Set(subModels)); // Use Set to filter unique submodels

    return uniqueSubModels;
  };

  if (!productId || productId === null) {
    return <ParentLoader />;
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleProductFormSubmit)}>
          <div className="flex items-center justify-between mb-5">
            {title && (
              <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
            )}

            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ArrowUpToLineIcon size={18} />
              )}
              {buttonTitle || "Save"}
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-6">
            <div className="flex flex-col gap-5 sm:col-span-4">
              {/* Product Details */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="productTitle"
                      label="Product Title"
                      placeholder="Gamer Gear Pro Controller"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="productBrand"
                      label="Brand Name"
                      placeholder="Honda"
                    />

                    <div className="sm:flex sm:items-start sm:gap-2">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="partNumber"
                        label="Part Number"
                        placeholder="HXT550"
                      />

                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="productCondition"
                        label="Condition"
                        placeholder="Select condition"
                      >
                        {ProductConditionOptions.map((condition, i) => (
                          <SelectItem key={i} value={condition}>
                            <p>{condition}</p>
                          </SelectItem>
                        ))}
                      </CustomFormField>
                    </div>

                    <CustomFormField
                      fieldType={FormFieldType.TEXT_EDITOR}
                      control={form.control}
                      name="shortDescription"
                      label="Short Description"
                      placeholder="Enter a short description of your product, we recommend writing in list style with bullet points"
                      // className="h-56"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.TEXT_EDITOR}
                      control={form.control}
                      name="longDescription"
                      label="Long Description"
                      placeholder="Enter a detailed description of your product"
                      // className="h-80"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Product Images
                  </CardTitle>
                  <CardDescription>
                    Add multiple images to your product. Max 12 images (PNG,
                    JPG, JPEG, WebP).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Uploaded Images Preview */}
                  <UploadedImagesPreview
                    images={product?.images}
                    productId={productId}
                  />
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="images"
                    renderSkeleton={(field) => (
                      <FormControl>
                        <ProductImagesUploader
                          onChange={field.onChange}
                          files={field.value || []}
                          options={{
                            maxFiles: 12 - (product?.images || []).length,
                            accept: {
                              "image/png": [".png"],
                              "image/jpeg": [".jpeg", ".jpg"],
                              "image/webp": [".webp"],
                            },
                          }}
                        />
                      </FormControl>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="category"
                      label="Category"
                      placeholder="Select category"
                    >
                      {categoriesLoading ? (
                        <div className="flex py-20 gap-1 justify-center items-center">
                          <Loader2
                            className="animate-spin text-primary"
                            size={20}
                          />
                          <p>Loading...</p>
                        </div>
                      ) : (
                        categories &&
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            <p>{category.categoryName}</p>
                          </SelectItem>
                        ))
                      )}
                    </CustomFormField>

                    {/* Subcategory */}
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="subCategory"
                      label="Subcategory (Optional)"
                      placeholder="Select subcategory"
                      disabled={subCategories.length === 0}
                    >
                      {subCategories.length > 0 &&
                        subCategories.map((subcategory) => (
                          <SelectItem
                            key={subcategory._id}
                            value={subcategory._id}
                          >
                            <p>{subcategory.categoryName}</p>
                          </SelectItem>
                        ))}
                      <SelectSeparator />
                      <Button
                        onClick={() => form.resetField("subCategory")}
                        variant={"ghost"}
                        size={"sm"}
                        className="w-full flex items-center gap-2"
                      >
                        clear selection
                        <X className="size-4" />
                      </Button>
                    </CustomFormField>
                  </div>
                </CardContent>
              </Card>

              {/* Stock & Price */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Stock / Price / SKU
                  </CardTitle>
                  <CardDescription>
                    Add the stock and price of your product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Regular Price (USD)</TableHead>
                        <TableHead>Sale Price (USD)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="sku"
                            // label="SKU"
                            placeholder="GGPC-001"
                            fieldType={FormFieldType.INPUT}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productStock"
                            // label="Stock"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="regularPrice"
                            // label="Regular Price"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="salePrice"
                            // label="Regular Price"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Shipping */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Shipping
                  </CardTitle>
                  <CardDescription>
                    Add Shipping and product dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    {/* <TableHeader>
                      <TableRow>
                        <TableHead>Length (in mm)</TableHead>
                        <TableHead>Width (in mm)</TableHead>
                        <TableHead>Height (in mm)</TableHead>
                        <TableHead>Shipping Price (USD)</TableHead>
                      </TableRow>
                    </TableHeader> */}
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productLength"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                            label="Length (in mm)"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productWidth"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                            label="Width (in mm)"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productHeight"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                            label="Height (in mm)"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productWeight"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                            label="Weight (in grams)"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="shippingPrice"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                            label="Shipping Price (USD)"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Compatibility Matcher */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Part Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <CustomFormField
                    control={form.control}
                    name="isGenericProduct"
                    fieldType={FormFieldType.CHECKBOX}
                    label="This is a generic product (check this if you don't have any vehicle information)"
                  />

                  {/* Years */}
                  {!isGenericProduct && (
                    <div>
                      <div className="flex flex-col gap-2">
                        <CustomFormField
                          fieldType={FormFieldType.SKELETON}
                          control={form.control}
                          name="compatibleYears"
                          renderSkeleton={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-sm">
                                  Select compatible years
                                </FormLabel>
                              </div>
                              <div className="grid sm:grid-cols-3 gap-3">
                                {getRecentYears().map((item, i) => (
                                  <FormField
                                    key={i}
                                    control={form.control}
                                    name="compatibleYears"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item}
                                          className="flex flex-row items-start space-x-2 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      item,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !== item
                                                      )
                                                    );
                                              }}
                                              checked={field.value?.includes(
                                                item
                                              )}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {item}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {!isGenericProduct && (
                    <div>
                      {/* Make */}
                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="compatibleMake"
                        label="Select compatible make"
                        placeholder="Select compatible make"
                      >
                        {metadata?.map((vehicle) => (
                          <SelectItem key={vehicle.make} value={vehicle.make}>
                            <p>{vehicle.make}</p>
                          </SelectItem>
                        ))}
                      </CustomFormField>

                      {/* Compatible Models with Checkbox */}
                      {selectedMake && (
                        <div className="my-4">
                          <div className="flex flex-col gap-2 mt-2">
                            <CustomFormField
                              fieldType={FormFieldType.SKELETON}
                              control={form.control}
                              name="compatibleModels"
                              renderSkeleton={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-sm">
                                      Select compatible models
                                    </FormLabel>
                                  </div>
                                  <div className="grid sm:grid-cols-3 gap-3">
                                    {getModels().map((item) => (
                                      <FormField
                                        key={item.name}
                                        control={form.control}
                                        name="compatibleModels"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={item.name}
                                              className="flex flex-row items-start space-x-2 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          item.name,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !==
                                                              item.name
                                                          )
                                                        );
                                                  }}
                                                  checked={field.value?.includes(
                                                    item.name
                                                  )}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal">
                                                {item.name}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* Sub Models */}
                      {selectedModels && selectedModels.length > 0 && (
                        <div className="my-4">
                          <div className="flex flex-col gap-2 mt-2">
                            <CustomFormField
                              fieldType={FormFieldType.SKELETON}
                              control={form.control}
                              name="compatibleSubmodels"
                              renderSkeleton={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-sm">
                                      Select compatible sub models
                                    </FormLabel>
                                  </div>
                                  <div className="grid sm:grid-cols-3 gap-3">
                                    {getSubModels().map((item, i) => (
                                      <FormField
                                        key={i}
                                        control={form.control}
                                        name="compatibleSubModels"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={item}
                                              className="flex flex-row items-start space-x-2 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          item,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !== item
                                                          )
                                                        );
                                                  }}
                                                  checked={field.value?.includes(
                                                    item
                                                  )}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal">
                                                {item}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right */}
            <div className="sm:col-span-2 flex flex-col gap-5">
              {/* Status */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Product Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="isActive"
                      label="Product Status"
                      placeholder="Select status"
                    >
                      {ProductStatusOptions.map((status, i) => (
                        <SelectItem key={i} value={status.value}>
                          <p>{status.label}</p>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 uppercase tracking-wider text-base">
                    Product SEO
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="metaTitle"
                    label="Meta Title"
                    placeholder="Enter meta title"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="metaDescription"
                    label="Meta Description"
                    placeholder="Enter meta description"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="keywords"
                    label="Keywords"
                    placeholder="Enter meta keywords"
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowUpToLineIcon size={18} />
                )}
                {buttonTitle || "Save"}
              </Button>
            </div>
            {/* Right End */}
          </div>
        </form>
      </Form>
    </section>
  );
}

export default EditProductForm;
