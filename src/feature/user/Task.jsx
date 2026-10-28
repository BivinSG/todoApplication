import { useDispatch } from "react-redux";
import Button from "../../Components/Button";
import { deleteTask } from "./taskThunks";
import styles from "./Todo.module.css";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const handleDeleteTask = async (deleteTaskId) => {
    const result = confirm("Are you sure you want to delete?");
    if (result) {
      dispatch(deleteTask(deleteTaskId));
    }
  };

  return (
    <div className={styles["task"]}>
      <div>{task?.taskName}</div>
      <Button
        className="btn btn-danger"
        buttonText="Delete"
        handleClick={() => handleDeleteTask(task?._id)}
      />
    </div>
  );
};

export default Task;
