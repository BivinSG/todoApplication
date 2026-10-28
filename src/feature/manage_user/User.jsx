import { useDispatch } from "react-redux";
import Button from "../../Components/Button";
import { restrictUserAccess } from "./userThunks";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const handleUser = (userId) => {
    const result = confirm("Are you sure to proceed with this action?");
    if (result) {
      dispatch(restrictUserAccess(userId));
    }
  };
  return (
    <div className="card mb-3">
      <div className="card-header fw-bold">
        {" "}
        {`User ID : ${user?._id} | Status : ${
          user?.active ? "Active" : "Inactive"
        }`}
      </div>
      <div className="p-2">
        <p className="fs-5 mb-0">Name: {user?.name}</p>
        <p className="fs-5 mb-0">Email: {user?.email}</p>
        <p className="fs-5 mb-0">
          Created on: {new Date(user?.createdAt)?.toDateString()}
        </p>
        <div className="d-flex justify-content-end">
          <Button
            buttonText={user?.active ? "Disable" : "Enable"}
            className={user?.active ? "btn btn-danger" : "btn btn-success"}
            handleClick={() => handleUser(user?._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
