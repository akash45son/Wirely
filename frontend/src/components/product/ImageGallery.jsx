import { useState } from "react";

const ImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] =
    useState(images[0] || "");

  if (!images.length) {
    return (
      <img
        src="https://placehold.co/600x400?text=No+Image"
        alt="No Product"
        className="h-[500px] w-full rounded-[12px] border border-[#E0E0E0]/60 object-cover"
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <img
        src={selectedImage}
        alt="Product"
        className="h-[450px] w-full rounded-[16px] border border-primary/10 object-cover shadow-sm"
      />

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              setSelectedImage(image)
            }
            className={`overflow-hidden rounded-[8px] border-2 transition duration-200 cursor-pointer ${
              selectedImage === image
                ? "border-primary shadow-sm"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-16 w-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;