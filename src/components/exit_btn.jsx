import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const ExitBtn = () => {
  return (
    <>
      <div class="exit-btn">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </div>
    </>
  );
};

export default ExitBtn;
