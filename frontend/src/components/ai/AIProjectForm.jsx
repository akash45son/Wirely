import { useState } from "react";

import Button from "../../common/Button";
import Input from "../../common/Input";

const AIProjectForm = ({
  onGenerate,
  isLoading,
}) => {
  const [project, setProject] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!project.trim()) return;

    onGenerate(project);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow"
    >
      <Input
        label="What do you want to build?"
        placeholder="Smart Irrigation System"
        value={project}
        onChange={(e) =>
          setProject(e.target.value)
        }
      />

      <Button
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? "Generating..."
          : "Generate Components"}
      </Button>
    </form>
  );
};

export default AIProjectForm;