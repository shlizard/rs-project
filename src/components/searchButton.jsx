import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchButton = () => {
  return (
    <button className="nav-button" value={"search-btn"}>
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <span className="search-btn-title">جستوجو فیلم و سریال ...</span>
    </button>
  );
};

export default SearchButton;
