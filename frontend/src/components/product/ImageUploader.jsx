import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_IMAGES = 5;

const ImageUploader = ({
  files,
  setFiles,
}) => {
  const [previews, setPreviews] =
    useState([]);

  useEffect(() => {
    if (!files.length) {
      setPreviews([]);
      return;
    }

    const imagePreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(imagePreviews);

    return () => {
      imagePreviews.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, [files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files
    );

    const updatedFiles = [
      ...files,
      ...selectedFiles,
    ].slice(0, MAX_IMAGES);

    setFiles(updatedFiles);

    e.target.value = "";
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];

    updatedFiles.splice(index, 1);

    setFiles(updatedFiles);
  };

  return (
    <div className="space-y-3 text-left">
      <label className="block text-sm font-medium text-gray-700">
        Product Images
      </label>

      <label className="flex cursor-pointer items-center justify-center gap-2.5 rounded-[8px] border border-dashed border-primary/20 bg-primary-light/10 p-6 transition duration-200 hover:bg-primary-light/30 hover:border-primary text-primary font-semibold text-sm">
        <ImagePlus size={18} />

        <span>
          Upload Images (Max {MAX_IMAGES})
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative rounded-[8px] overflow-hidden border border-primary/10"
            >
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(index)
                }
                className="absolute right-1.5 top-1.5 rounded-full bg-[#1A1A1A]/80 p-1 text-white hover:bg-red-650 transition duration-200 cursor-pointer shadow-sm"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;