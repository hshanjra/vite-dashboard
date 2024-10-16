import { deleteProductImage } from "@/http";
import { useMutation } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props {
  images?: {
    url: string;
    alt: string;
  }[];
  productId: string;
}

function UploadedImagesPreview({ images, productId }: Props) {
  const { toast } = useToast();
  // Mutation
  const mutation = useMutation({
    mutationFn: deleteProductImage,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },

    onSuccess: () => {
      // Show toast message
      toast({
        title: "Success",
        description: "Image deleted successfully",
        variant: "success",
      });
    },
  });

  if (!images || images.length === 0 || !productId) return null;

  const handleRemove = async (url: string) => {
    // check if only 1 image is left
    if (images.length === 1) {
      toast({
        title: "Error",
        description: "Product must have at least one image",
        variant: "destructive",
      });
      return;
    }

    // Remove image from database as well as from image server
    mutation.mutate({ productId, imageURL: url });

    // Update images array
    if (mutation.isSuccess) {
      images.splice(
        images.findIndex((img) => img.url === url),
        1
      );
    }
  };

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 items-center mb-5">
      {images.map((img, i) => (
        <div key={i} className="relative">
          <img
            src={img.url}
            alt="Preview"
            width={400}
            height={400}
            className="max-h-[350px] overflow-hidden object-cover border rounded-lg aspect-square"
            loading="lazy"
          />
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                type="button"
              >
                <X size={16} />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Image</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this image?
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2">
                <DialogClose asChild>
                  <Button type="button">Cancel</Button>
                </DialogClose>

                <Button
                  variant={"destructive"}
                  onClick={() => handleRemove(img.url)}
                  type="button"
                  disabled={mutation.isPending}
                  className="flex items-center gap-2"
                >
                  {mutation.isPending && (
                    <Loader2 className="animate-spin" size={16} />
                  )}
                  Delete Image
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}

export default UploadedImagesPreview;
