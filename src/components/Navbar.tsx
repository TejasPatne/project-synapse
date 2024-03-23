import { Link } from "react-router-dom";
import homeLogo from "../assets/images/home_logo.png";
import data from "../db/output.json";
import { useState } from "react";

export default function Navbar() {
  const [searchResult, setSearchResult] = useState([]);
  
  // Function to perform the actual search
  const performSearch = (term: any) => {
    // Filter the data based on the search term
    let results: any;
    if(term!=="" && term.length >= 3){
      results = data?.filter(item => {
        if(item["B"].toLowerCase() !== "title")
          return item["B"].toLowerCase().includes(term.toLowerCase())
      }
        
      );
    } else {
      results = []
    }
    setSearchResult(results);
  };

  // Debounce function to delay the execution of search
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;;
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
          <div className="text-xs md:text-sm">Department of Artificial Intelligence & Data Science</div>
          <div className="font-bold text-xl text-yellow-400">Project Synapse</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 text-right">
        <input onChange={handleSearchTerm} type="text" className="bg-slate-400 placeholder:text-white w-32 rounded-full h-8 px-4 py-5 mr-4 outline-none" placeholder="Search..." />
      </div>

      <div className="absolute right-0 top-14 m-4 z-10 bg-slate-400 rounded-md">
        {/* Display search results */}
        {searchResult.map((item, index) => (
          <Link to={`/project/${item["A"]}`} key={index} onClick={() => debouncedSearch("")}>
            <p className="line-clamp-1 p-2 w-full">{item["B"]}</p>
            <div className="w-full h-[0.5px] bg-slate-500"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
