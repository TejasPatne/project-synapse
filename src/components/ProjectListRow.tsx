import { Link } from "react-router-dom";

type ProjectProps = {
  index: number;
  title: string;
  domain: string;
  guide: string;
  year?: string; // Added year property for the new data structure
};

export default function ProjectListRow({ project }: { project: ProjectProps }) {
  // Create a link that includes both year and project index
  const projectLink = project.year
    ? `/project/${project.year}/${project.index}`
    : `/project/${project.index}`;

  return (
    <div>
      <Link to={projectLink}>
        <div
          className={`flex items-start justify-start space-x-8 bg-slate-100 py-2 text-slate-500
            px-5 rounded-sm hover:bg-slate-200 transition-colors`}
        >
          <div>
            <div
              className={`flex text-start justify-start w-[50vw] items-start space-x-8`}
            >
              <p>{project.index}</p>
              <p className="line-clamp-1">
                {project.title || "untitled project"}
              </p>
            </div>
          </div>

          <div>
            <div className="flex text-start items-start space-x-8">
              <p className="w-[15vw] line-clamp-1">
                {project.domain || "_ _ _ _"}
              </p>
              <p className="w-[15vw] line-clamp-1 hidden md:contents">
                {project.guide || "unknown"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
