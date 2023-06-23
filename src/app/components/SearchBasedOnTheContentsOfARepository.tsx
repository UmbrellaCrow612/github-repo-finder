"use client";

import React, { useState } from "react";

const SearchBasedOnTheContentsOfARepository = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      searchTerm
    )}+in:readme`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.items || []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="h-[32rem] p-2 space-y-5 max-w-screen-xl mx-auto border shadow-md">
      <h1 className="flex items-center justify-center text-center text-2xl font-bold leading-tight tracking-wide">
        Search based on the content in the repository&apos;s README file of a
        repository
      </h1>
      <div className="w-full flex items-center justify-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full max-w-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="SWR..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="w-full h-[20rem] overflow-auto">
        <ul>
          {searchResults.map((result: any) => (
            <li key={result.id}>
              <a
                href={result.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {result.full_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SearchBasedOnTheContentsOfARepository;
