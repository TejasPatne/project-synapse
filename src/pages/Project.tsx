import { useNavigate, useParams } from "react-router-dom";
import { Team } from "../components";
import data from "../db/output.json";
import { useEffect } from "react";

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

interface ProjectInfo {
  "Group No.": number;
  "Project Title": string;
  "Team Members": string[];
  Guide: string;
  "Co-guide": string;
  "Project Description": string;
  "GitHub Link": string;
  "Demo Video Link": string;
  "Project Domain": string;
  Year: string;
  Photos: string[];
  "Guide Photo": string;
  "Co-guide Photo": string;
}

export default function Project() {
  // Extract both projectId and year from URL params
  const { projectId, year } = useParams();
  const navigate = useNavigate();

  // Cast the imported data to our interface
  const projectDataByYear = data as unknown as ProjectDataByYear;

  // Default project info structure with empty values
  const defaultProjectInfo: ProjectInfo = {
    "Group No.": 0,
    "Project Title": "Project title",
    "Team Members": [],
    Guide: "Guide",
    "Co-guide": "Co-guide",
    "Project Description": "Project Description (300-700 words)",
    "GitHub Link": "GitHub Link",
    "Demo Video Link": "",
    "Project Domain": "Project Domain",
    Year: year || "",
    Photos: [],
    "Guide Photo": "",
    "Co-guide Photo": "",
  };

  // Find the project based on year and projectId
  let projectData: ProjectData | undefined;

  if (year && projectId) {
    // If both year and projectId are provided, find in the specific year
    const yearData = projectDataByYear[year];
    if (yearData) {
      projectData = yearData.find(
        (project) => project.grpno.toString() === projectId
      );
    }
  } else if (projectId) {
    // If only projectId is provided, search across all years
    for (const yearProjects of Object.values(projectDataByYear)) {
      const foundProject = yearProjects.find(
        (project) => project.grpno.toString() === projectId
      );
      if (foundProject) {
        projectData = foundProject;
        break;
      }
    }
  }

  // Convert project data to the ProjectInfo format if found
  let projectInfo: ProjectInfo = defaultProjectInfo;

  if (projectData) {
    projectInfo = {
      "Group No.": projectData.grpno,
      "Project Title": projectData.title,
      "Team Members": [
        projectData.member1,
        projectData.member2,
        projectData.member3,
        projectData.member4,
      ].filter(Boolean), // Filter out any empty members
      Guide: projectData.guide,
      "Co-guide": projectData.coguide,
      "Project Description": projectData.description,
      "GitHub Link": projectData.github,
      "Demo Video Link": projectData.demo,
      "Project Domain": projectData.domain,
      Year: year || "", // Use the year from params or empty string
      Photos: [
        projectData["member1 photo"] || "",
        projectData["member2 photo"] || "",
        projectData["member3 photo"] || "",
        projectData["member4 photo"] || "",
      ].filter(Boolean), // Filter out any empty photo URLs
      "Guide Photo": projectData["guide photo"] || "",
      "Co-guide Photo": projectData["coguide photo"] || "",
    };
  }

  // Navigate to home if project not found
  useEffect(() => {
    if (!projectData) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [projectData, navigate]);

  // Prepare team info and photos arrays
  const teamInfo = [projectInfo["Guide"], projectInfo["Co-guide"]]
    .filter(Boolean)
    .concat(projectInfo["Team Members"]);

  const teamPhotos = [projectInfo["Guide Photo"], projectInfo["Co-guide Photo"]]
    .filter(Boolean)
    .concat(projectInfo["Photos"]);

  return (
    <div className="flex flex-col justify-between p-6 md:p-14 md:gap-10 md:flex-row">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-3xl font-bold text-left">
            {projectInfo["Project Title"] || "BE Project"}
          </h2>
          {projectInfo["Year"] && (
            <p className="text-left text-slate-500 mt-1">
              Academic Year: {projectInfo["Year"]}
            </p>
          )}
        </div>

        <div className="flex flex-col text-left opacity-60 gap-4">
          <p>
            {projectInfo["Project Description"] ||
              "We apologize for any inconvenience, but the project description is currently unavailable. Rest assured, we are actively working to update this page with comprehensive details. Thank you for your understanding and patience."}
          </p>
        </div>
        <div>
          {projectInfo["Demo Video Link"] ? (
            <iframe
              width="560"
              height="315"
              src={projectInfo["Demo Video Link"]}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="bg-slate-100 flex items-center justify-center w-full h-60 rounded">
              <p className="text-slate-400">No demo video available</p>
            </div>
          )}
        </div>
        <div className="text-left">
          <a
            className="text-blue-600 italic font-semibold underline"
            href={projectInfo["GitHub Link"] || "https://www.github.com/404"}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <Team team={teamInfo} photos={teamPhotos} />
    </div>
  );
}
