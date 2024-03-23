import ProjectListRow from "./ProjectListRow";
import data from "../db/output.json";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProjectTable() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const testData =
    selectedOption === ""
      ? data
      : data?.filter((i) => i["L"]?.includes(selectedOption));

  return (
    <div className="mt-36 px-2 md:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold">Project List</h1>
        <div className="flex text-slate-500 bg-slate-100 text-sm md:text-base md:px-4 py-1 rounded-full md:w-36 px-2">
          <select className="outline-none w-full bg-slate-100" value={"2023-24"} onChange={()=> {}}>
            <option value="2023-24">2023-24</option>
          </select>
        </div>
      </div>

      <div className="mt-8 bg-slate-100">
        <div>
          <Link to={`/`}>
            <div
              className={`flex items-start justify-start space-x-8 font-semibold py-1 cursor-default
            px-5 rounded-sm`}
            >
              <div>
                <div
                  className={`flex justify-start w-[50vw] items-start space-x-8 font-semibold`}
                >
                  <p>#</p>
                  <p className="line-clamp-1">Project Title</p>
                </div>
              </div>

              <div>
                <div className="flex text-start items-start space-x-8">
                  <select
                    name=""
                    id=""
                    value={selectedOption}
                    onChange={handleChange}
                    className="w-20 md:w-full bg-slate-100"
                  >
                    <option value="">Domain</option>
                    <option value="Deep Learning">Deep Learning</option>
                    <option value="NLP">NLP</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Predictive maintenance">
                      Predictive Maintenance
                    </option>
                  </select>
                  <p className="w-[15vw] line-clamp-1 hidden md:contents">Guide</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {testData.map((project) => {
          if (project["L"] !== "domain")
            return (
              <ProjectListRow
                key={project["A"]}
                project={{
                  index: project["A"] as number,
                  title: project["B"],
                  domain: project["L"] as string,
                  guide: project["G"],
                }}
              />
            );
        })}
      </div>
    </div>
  );
}
