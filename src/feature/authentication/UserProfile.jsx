import { useSelector } from "react-redux";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { auth } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#8294a1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          minHeight: "230px",
          backgroundColor: "white",
          padding: "30px",
          border: "2px solid black",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div>UserId: {auth?.id}</div>
          <div>Name: {auth?.name}</div>
        </div>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Button
            className="btn btn-secondary"
            buttonText="Back"
            handleClick={goBack}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
