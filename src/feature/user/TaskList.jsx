import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { fetchTasks } from "./taskThunks";
import styles from "./Todo.module.css";
import Loading from "../../Components/Loading";

const TaskList = () => {
  const dispatch = useDispatch();
  const { loading, searchTask, tasks } = useSelector(
    (state) => state?.taskState,
  );

  useEffect(() => {
    const promise = dispatch(fetchTasks());
    
    return () => {
      console.log(promise);
      promise?.abort();
    };
  }, [dispatch]);

  return (
    <div className={styles["task-container"]}>
      {loading && <Loading />}
      {!loading && tasks?.length > 0 ? (
        tasks
          ?.filter((task) =>
            task?.taskName?.toLowerCase().includes(searchTask?.toLowerCase()),
          )
          ?.map((task) => <Task task={task} key={task?._id} />)
      ) : (
        <div>No tasks found</div>
      )}
    </div>
  );
};

export default TaskList;
