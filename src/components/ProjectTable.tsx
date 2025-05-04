import ProjectListRow from "./ProjectListRow";
import data from "../db/output.json";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProjectData {
  grpno: number;
  title: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  guide: string;
  coguide: string;
  description: string;
  github: string;
  demo: string;
  domain: string;
  "Research Paper Doc"?: string;
  "Fundings Received"?: boolean;
  "member1 photo"?: string;
  "member2 photo"?: string;
  "member3 photo"?: string;
  "member4 photo"?: string;
  "guide photo"?: string;
  "coguide photo"?: string;
}

interface ProjectDataByYear {
  [year: string]: ProjectData[];
}

export default function ProjectTable() {
  // State for domain filter and year selection
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2024-25");

  // Cast the imported data to our interface
  const projectData = data as unknown as ProjectDataByYear;

  // Handle year change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Handle domain filter change
  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomain(e.target.value);
  };

  // Get the projects for the selected year
  const yearProjects = projectData[selectedYear] || [];

  // Filter projects by domain if a domain is selected
  const filteredProjects = selectedDomain
    ? yearProjects.filter((project) => project.domain?.includes(selectedDomain))
    : yearProjects;

  // Extract unique domains from the current year's data for the dropdown
  const availableDomains = Array.from(
    new Set(yearProjects.map((project) => project.domain))
  ).filter(Boolean);

  return (
    <div className="mt-36 px-2 md:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold">Project List</h1>
        <div className="flex text-slate-500 bg-slate-100 text-sm md:text-base md:px-4 py-1 rounded-full md:w-36 px-2">
          <select
            className="outline-none w-full bg-slate-100"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {Object.keys(projectData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
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
                    name="domain-filter"
                    id="domain-filter"
                    value={selectedDomain}
                    onChange={handleDomainChange}
                    className="w-20 md:w-full bg-slate-100"
                  >
                    <option value="">Domain</option>
                    {availableDomains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                  <p className="w-[15vw] line-clamp-1 hidden md:contents">
                    Guide
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {filteredProjects.map((project) => (
          <ProjectListRow
            key={project.grpno}
            project={{
              index: project.grpno,
              title: project.title,
              domain: project.domain,
              guide: project.guide,
              year: selectedYear,
            }}
          />
        ))}
      </div>
    </div>
  );
}
