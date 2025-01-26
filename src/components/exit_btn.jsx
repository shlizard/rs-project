import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";


const ExitBtn = () => {
  return (
    <>
      <div class="exit">
        <  FontAwesomeIcon icon={faArrowRightFromBracket} id="icon" />
        <div id="line">
            |
        </div>
      </div>
    </>
  );
};

export default ExitBtn;
