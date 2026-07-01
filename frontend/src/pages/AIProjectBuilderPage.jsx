import { useState } from "react";

import AIProjectForm from "../components/ai/AIProjectForm";
import { generateProject } from "../services/aiService";

const AIProjectBuilderPage = () => {
  const [projectData, setProjectData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleGenerate = async (
    project
  ) => {
    try {
      setLoading(true);
      setError("");

      const data =
        await generateProject(project);

      setProjectData(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-4xl font-bold">
        AI Project Builder
      </h1>

      <AIProjectForm
        onGenerate={handleGenerate}
        isLoading={loading}
      />

      {error && (
        <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      {projectData && (
        <pre className="mt-8 overflow-auto rounded-lg bg-gray-900 p-6 text-green-400">
          {JSON.stringify(
            projectData,
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
};

export default AIProjectBuilderPage;