import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  return (
    <>
      <form class="search-bar">
        <FontAwesomeIcon icon={faSearch} id="search-icon" />
        <input type="text" id="search-box" name="search-box" placeholder="جستجو فیلم و سریال" />
      </form>
    </>
  );
};

export default Search;
