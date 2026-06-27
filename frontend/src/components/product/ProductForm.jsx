import { useState } from "react";

import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import Select from "../../common/Select";
import Button from "../../common/Button";

import ImageUploader from "./ImageUploader";

const ProductForm = ({
  categories,
  onSubmit,
  isSubmitting = false,
  initialValues = null,
  submitButtonText = "Create Product",
}) => {
  const [files, setFiles] = useState([]);

 const [formData, setFormData] = useState({
  title: initialValues?.title || "",
  description:
    initialValues?.description || "",
  price: initialValues?.price || "",
  condition:
    initialValues?.condition || "",
  category:
    initialValues?.category?._id ||
    initialValues?.category ||
    "",
});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      files,
    });
  };

  const categoryOptions = categories.map(
    (category) => ({
      value: category._id,
      label: category.name,
    })
  );

  const conditionOptions = [
    {
      value: "Like New",
      label: "Like New",
    },
    {
      value: "Good",
      label: "Good",
    },
    {
      value: "Fair",
      label: "Fair",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[12px] border border-[#E0E0E0]/60 bg-white p-8 shadow-sm text-left"
    >
      <Input
        label="Product Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Arduino UNO R3"
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your product..."
        required
      />

      <Input
        label="Price (₹)"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="500"
        required
      />

      <Select
        label="Condition"
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        options={conditionOptions}
        required
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={categoryOptions}
        required
      />

      <ImageUploader
        files={files}
        setFiles={setFiles}
      />

     <Button
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting
    ? "Please wait..."
    : submitButtonText}
</Button>
    </form>
  );
};

export default ProductForm;