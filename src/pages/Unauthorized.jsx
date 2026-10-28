import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="fs-4 fw-bold">Unauthorized</div>
      <div>
        <Button
          className="btn btn-secondary"
          handleClick={goBack}
          buttonText={"Go Back"}
        />
      </div>
    </div>
  );
};

export default Unauthorized;
