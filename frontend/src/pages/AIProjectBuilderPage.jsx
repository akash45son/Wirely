import { useState } from "react";

import AIProjectForm from "../components/ai/AIProjectForm";
import { generateProject } from "../services/aiService";
import ProjectSummary from "../components/ai/ProjectSummary";
import ComponentCard from "../components/ai/ComponentCard";

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
        <ProjectSummary
  project={projectData}
/>
      )}

      {
  projectData && (
    <div className="mt-8">

      <h2 className="mb-6 text-3xl font-bold">
        Required Components
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        {projectData.components.map(
          (component, index) => (

            <ComponentCard
              key={index}
              component={component}
            />

          )
        )}

      </div>

    </div>
  )
}
    </div>
  );
};

export default AIProjectBuilderPage;