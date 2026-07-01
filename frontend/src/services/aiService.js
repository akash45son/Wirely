import api from "./api";

export const generateProject = async (
  project
) => {
  const { data } = await api.post(
    "/ai/project-builder",
    {
      project,
    }
  );

  return data.result;
};