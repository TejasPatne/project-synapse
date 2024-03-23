import { Link } from "react-router-dom";

type ProjectProps = {
  index: number;
  title: string;
  domain: string;
  guide: string;
};

export default function ProjectListRow({ project }: { project: ProjectProps }) {
  return (
    <div>
      <Link to={`/project/${project.index}`}>
        <div
          className={`flex items-start justify-start space-x-8 bg-slate-100 py-2 text-slate-500
            px-5 rounded-sm`}
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
