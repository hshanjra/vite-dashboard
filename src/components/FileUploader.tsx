import { cn, convertFileToUrl } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  options?: DropzoneOptions;
};

function FileUploader({ files, onChange, options }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...options,
  });

  const handleRemove = (event: React.MouseEvent, fileToRemove: File) => {
    event.stopPropagation();
    if (files) {
      const updatedFiles = files.filter((file) => file !== fileToRemove);
      onChange(updatedFiles);
    }
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border flex items-center justify-center border-dashed rounded-lg p-5 gap-3 cursor-pointer text-center flex-col",
        {
          "border-green-500 bg-green-50": isDragActive,
        }
      )}
    >
      {files && files.length > 0 ? (
        <div className="flex gap-2 items-center">
          {files.map((file) => (
            <div key={file.name} className="relative">
              <img
                src={convertFileToUrl(file)}
                width={400}
                height={400}
                alt="Uploaded image"
                className="max-h-[350px] overflow-hidden object-cover border rounded-lg aspect-square"
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
        </div>
      ) : (
        <div className="py-10 flex items-center justify-center flex-col">
          <Upload size={40} strokeWidth={1} />
          <div className="flex flex-col justify-center gap-2 text-center">
            <p className="text-xs">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>

            <p className="text-xs font-semibold">JPG, JPEG, or PNG</p>
          </div>
        </div>
      )}
      <input {...getInputProps()} />
    </div>
  );
}

export default FileUploader;
