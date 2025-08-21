import { useEffect, useState } from "react";
import searchIcon from "../../assets/icons/search.svg"
const Search = ({ placeholder = "Search title...", query, setQuery }) => {
  const [value, setValue] = useState(query || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, setQuery]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 !px-4 !py-2 border border-gray-200">
      <img src={searchIcon} alt="search" width={24} height={24} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-gray-50 border-0 outline-none placeholder-gray-500 !px-2 !ml-2"
      />
    </div>
  );
};

export default Search;
