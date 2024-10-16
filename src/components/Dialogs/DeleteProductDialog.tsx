import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteProduct } from "@/http";
import { Button } from "../ui/button";
import { Product } from "@/types";

interface DeleteProductDialogProps {
  product: Product;
  isDialogOpen: boolean;
}

function DeleteProductDialog({
  product,
  isDialogOpen,
}: DeleteProductDialogProps) {
  const mutation = useMutation({
    mutationFn: deleteProduct,
  });
  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger className="text-sm px-2">Delete Product</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between gap-2 items-center my-2">
          <img
            src={product.images[0].url}
            alt="product image"
            className="w-16"
          />
          <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        </div>

        <DialogFooter>
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => mutation.mutate(product.productId)}
          >
            Delete this product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProductDialog;
