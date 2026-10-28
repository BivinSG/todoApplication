import Input from "../Components/Input";
import User from "../feature/manage_user/User";
import styles from "../feature/manage_user/AdminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../feature/manage_user/userThunks";
import { searchUser } from "../feature/manage_user/userSlice";
// const searchUser = "";
// const users = [
//   {
//     _id: "1",
//     name: "user1",
//     email: "user1@wynxio.com",
//     status: true,
//     createdAt: "2026-08-01T17:44:22.654+00:00",
//     updatedAt: "2026-08-01T18:38:50.604+00:00",
//   },
//   {
//     _id: "2",
//     name: "user1",
//     email: "user1@wynxio.com",
//     status: true,
//     createdAt: "2026-08-01T17:44:22.654+00:00",
//     updatedAt: "2026-08-01T18:38:50.604+00:00",
//   },
//   {
//     _id: "3",
//     name: "user1",
//     email: "user1@wynxio.com",
//     status: true,
//     createdAt: "2026-08-01T17:44:22.654+00:00",
//     updatedAt: "2026-08-01T18:38:50.604+00:00",
//   },
// ];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {
    users,
    searchUser: searchUserValue,
    loading,
  } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value));
  };
  return (
    <>
      <div className={styles["output-container"]}>
        <div className={styles["input-container"]}>
          <Input
            name={"searchUser"}
            placeholder="Enter your search here..."
            value={searchUserValue}
            handleInputChange={handleSearch}
          />
        </div>
        <div className={styles["user-container"]}>
          {loading ? (
            <div>Loading users . . .</div>
          ) : users?.length > 0 ? (
            users
              ?.filter((user) =>
                user?.name
                  ?.toLowerCase()
                  ?.includes(searchUserValue?.toLowerCase()),
              )
              ?.map((user) => <User user={user} key={user?._id} />)
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
