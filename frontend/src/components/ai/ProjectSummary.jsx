import {
  BrainCircuit,
  Clock3,
  IndianRupee,
  BarChart3,
  FileText,
} from "lucide-react";

const difficultyConfig = {
  Beginner: { color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  Intermediate: { color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  Advanced: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

const ProjectSummary = ({ project }) => {
  if (!project) return null;

  const difficulty = difficultyConfig[project.difficulty] || difficultyConfig.Beginner;

  return (
    <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

      {/* Top accent bar */}
      <div className="h-1.5 w-full rounded-t-2xl bg-green-700" />

      <div className="p-8">

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
            <BrainCircuit size={26} className="text-green-700" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
              AI Generated Project
            </p>
            <h2 className="mt-0.5 text-2xl font-bold text-gray-900">
              {project.project}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-100" />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">

          {/* Difficulty */}
          <div className={`rounded-xl border ${difficulty.border} ${difficulty.bg} p-4`}>
            <div className="mb-2 flex items-center gap-2">
              <BarChart3 size={17} className={difficulty.color} />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Difficulty
              </span>
            </div>
            <p className={`text-lg font-bold ${difficulty.color}`}>
              {project.difficulty}
            </p>
          </div>

          

          {/* Build Time */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Clock3 size={17} className="text-green-700" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Build Time
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {project.estimatedBuildTime}
            </p>
          </div>

        </div>

        {/* Description */}
        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <FileText size={17} className="text-green-700" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Project Description
            </h3>
          </div>
          <p className="text-sm leading-7 text-gray-600">
            {project.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProjectSummary;