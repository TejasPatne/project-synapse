import { useNavigate, useParams } from "react-router-dom";
import { Team } from "../components";
import data from "../db/output.json";
import { useEffect } from "react";

interface ProjectInfo {
  "Group No.": number;
  "Project Title": string;
  "Team Members": string[];
  "Guide": string;
  "Co-guide": string; // Optional property
  "Project Description": string;
  "GitHub Link": string;
  "Demo Video Link": string;
  "Project Domain": string;
  "Photos": string[];
  "Guide Photo": string;
  "Co-guide Photo": string; 
}

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const projectData  = data.find((project) => project["A"].toString() === projectId);
  let projectInfo: ProjectInfo;
  useEffect(() => {
    if(projectInfo === undefined) {
      navigate('/')
    }
    window.scrollTo(0, 0);
  }, [])
  projectInfo = {
                  "Group No.":0, 
                  "Project Title": "Project title", 
                  "Team Members": [], 
                  "Guide": "Guide",
                  "Co-guide": "Co-guide", 
                  "Project Description": "Project Description (300-700 words)", 
                  "GitHub Link": "GitHub Link", 
                  "Demo Video Link": "", 
                  "Project Domain":"Project Domain",
                  "Photos": [], 
                  "Guide Photo": "",
                  "Co-guide Photo": "", 
                };
  if(projectData !== undefined) projectInfo = {
    "Group No.": projectData["A"] as number,
    "Project Title": projectData["B"],
    "Team Members": [projectData["C"], projectData["D"], projectData["E"], projectData["F"] as string], 
    "Guide": projectData["G"],
    "Co-guide": projectData["H"], 
    "Project Description": projectData["I"] as string, 
    "GitHub Link": projectData["J"] as string, 
    "Demo Video Link": projectData["K"] as string, 
    "Project Domain":projectData["L"] as string,
    "Photos": [projectData["O"], projectData["P"], projectData["Q"], projectData["R"] as string], 
    "Guide Photo": projectData["S"] as string,
    "Co-guide Photo": projectData["T"] as string, 
  };
  let teamInfo: string[] = ["temp"];
  const teamMentors = [projectInfo?.['Guide'], projectInfo?.["Co-guide"]];
  const teamMembers = projectInfo["Team Members"];
  if(teamMentors !== undefined){
    teamInfo.pop();
    teamInfo.push(...teamMentors);
  }
  if(teamMembers !== undefined){
    teamInfo.push(...teamMembers);
  }
  let teamPhotos: string[] = ["temp"];
  const mentorsPhoto = [projectInfo?.["Guide Photo"], projectInfo?.["Co-guide Photo"]];
  const membersPhoto = projectInfo["Photos"];
  if(mentorsPhoto !== undefined){
    teamPhotos.pop();
    teamPhotos.push(...mentorsPhoto);
  }
  if(membersPhoto !== undefined){
    teamPhotos.push(...membersPhoto);
  }
  
  return (
    <div className="flex flex-col justify-between p-6 md:p-14 md:gap-10 md:flex-row">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl md:text-3xl font-bold text-left">{(projectInfo && projectInfo["Project Title"]) || "BE Project"}</h2>
        <div className="flex flex-col text-left opacity-60 gap-4">
          <p>
            {(projectInfo && projectInfo["Project Description"]) || "We apologize for any inconvenience, but the project description is currently unavailable. Rest assured, we are actively working to update this page with comprehensive details. Thank you for your understanding and patience."}
          </p>
        </div>
        <div>
          <iframe
            className={`w-full h-[300px] md:min-h-[450px] ${!projectInfo["Demo Video Link"] && "hidden"}`}
            src={(projectInfo && projectInfo["Demo Video Link"]) || "https://www.youtube.com/embed/"}
            title="video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="text-left">
          <a
            className="text-blue-600 italic font-semibold underline"
            href={(projectInfo && projectInfo["GitHub Link"]) || "https://www.github.com/404"}
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
