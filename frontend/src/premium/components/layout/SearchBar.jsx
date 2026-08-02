import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="rx-search">

      <Search
        size={18}
        className="rx-search-icon"
      />

      <input
        type="text"
        placeholder="Search students, results..."
      />

    </div>
  );
};

export default SearchBar;