import { Link } from "react-router-dom";
import homeLogo from "../assets/images/home_logo.png";
import data from "../db/output.json";
import { useState } from "react";

interface ProjectData {
  grpno: number;
  title: string;
  domain: string;
  guide: string;
  // Additional fields can be added as needed
}

interface SearchResult extends ProjectData {
  year: string;
}

interface ProjectDataByYear {
  [year: string]: ProjectData[];
}

export default function Navbar() {
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  // Cast the imported data to our interface
  const projectData = data as unknown as ProjectDataByYear;

  // Function to perform the actual search
  const performSearch = (term: string) => {
    // Only search if term is at least 3 characters
    if (term !== "" && term.length >= 3) {
      // Search through all years and combine results
      const results: SearchResult[] = [];

      Object.entries(projectData).forEach(([year, projects]) => {
        const yearResults = projects
          .filter((project) =>
            project.title.toLowerCase().includes(term.toLowerCase())
          )
          .map((project) => ({
            ...project,
            year,
          }));

        results.push(...yearResults);
      });

      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  };

  // Debounce function to delay the execution of search
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Debounced version of the search function
  const debouncedSearch = debounce(performSearch, 500);

  // Event handler for input change
  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedSearch(value);
  };

  return (
    <div className="bg-slate-500 text-white flex items-center justify-between py-0 px-2 shadow-lg fixed top-0 left-0 right-0 z-10 md:px-10">
      {/* Logo */}
      <div className="flex-1">
        <Link to={"/"}>
          <img
            src={homeLogo}
            alt="VESIT"
            className="text-3xl font-extrabold h-14"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="hidden md:contents">
        <div className="text-sm md:text-base flex-1">
          <div className="text-xs md:text-sm">
            Department of Artificial Intelligence & Data Science
          </div>
          <div className="font-bold text-xl text-yellow-400">
            Project Synapse
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 text-right">
        <input
          onChange={handleSearchTerm}
          type="text"
          className="bg-slate-400 placeholder:text-white w-32 rounded-full h-8 px-4 py-5 mr-4 outline-none"
          placeholder="Search..."
        />
      </div>

      <div className="absolute right-0 top-14 m-4 z-10 bg-slate-400 rounded-md">
        {/* Display search results */}
        {searchResult.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {searchResult.map((item, index) => (
              <Link
                to={`/project/${item.year}/${item.grpno}`}
                key={index}
                onClick={() => setSearchResult([])}
              >
                <div className="hover:bg-slate-500 transition-colors">
                  <p className="line-clamp-1 p-2 w-full">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-slate-200 ml-2">
                      ({item.year})
                    </span>
                  </p>
                  <div className="w-full h-[0.5px] bg-slate-500"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
