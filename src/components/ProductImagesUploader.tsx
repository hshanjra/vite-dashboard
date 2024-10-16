import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

// Extend the File type to include a preview property
type UploadedFile = File & {
  preview: string; // URL for previewing the image
};

// type ExistingFile = {
//   url: string; // URL for an existing image
//   alt?: string; // Optional alt if you need to reference the image for deletion
// };
type FileUploaderProps = {
  onChange: (files: UploadedFile[]) => void;
  files: UploadedFile[];
  options: DropzoneOptions;
};

function ProductImagesUploader({
  files,
  onChange,
  options,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) as UploadedFile
      );
      onChange([...newFiles]); // Add new files to the existing ones
    },
    [onChange]
  );

  const handleRemove = (
    event: React.MouseEvent,
    fileToRemove: UploadedFile
  ) => {
    event.stopPropagation();
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    onChange(updatedFiles);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if ("preview" in file) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...options,
    maxSize: 2000000,
  });

  if (!files || files.length === 0) {
    return (
      <div className="grid gap-2">
        <button
          {...getRootProps()}
          type="button"
          className={cn(
            "flex h-52 w-full items-center justify-center rounded-md border-2 border-dashed",
            {
              "border-sky-500 bg-sky-50": isDragActive,
            }
          )}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <Upload className="h-4 w-4 text-zinc-700" />
            <p className="text-sm font-bold text-zinc-700">
              Drag drop some files here, or click to select files
            </p>

            <span className="sr-only">Upload</span>
            <p className="text-xs font-semibold text-zinc-400">
              JPG, JPEG, PNG or WebP. Up to 2MB each
            </p>
          </div>

          <input {...getInputProps()} />
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {files && files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {files.map((file) => (
            <div key={file.name} className="relative">
              <img
                src={file.preview}
                width={400}
                height={400}
                alt="Uploaded image"
                className="max-h-[350px] overflow-hidden object-cover border rounded-lg aspect-square"
                loading="lazy"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={(e) => handleRemove(e, file)}
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          <button
            className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            {...getRootProps()}
            type="button"
          >
            <Upload className="h-4 w-4 text-zinc-700" />
            <span className="sr-only">Upload</span>
            <input {...getInputProps()} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductImagesUploader;
