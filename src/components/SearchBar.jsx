import { BiSearch } from "react-icons/bi";
import "./css/SearchBar.css";

const SearchBar = ({ search, setSearch, handleSearch }) => {
   return (
      <>
         <form className="searchBar" onSubmit={handleSearch}>
            <input
               className="searchBar-input"
               type="text"
               placeholder="Buscar por ID..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch className="searchBar-icon" onClick={handleSearch} />
         </form>
      </>
   );
};

export default SearchBar;
