import { TextInput } from "flowbite-react";
import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  //   useEffect(() => {

  //   },[query])
  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
      <img src="/icons/search.svg" alt="search" width={24} height={24} />
      <TextInput
        color="grey"
        type="text"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-gray-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
