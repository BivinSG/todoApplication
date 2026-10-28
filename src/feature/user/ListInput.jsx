import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { postTask } from "./taskThunks";
import styles from "./Todo.module.css";
import { searchTask } from "./taskSlice";

const ListInput = () => {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const searchTaskValue = useSelector((state) => state.taskState.searchTask);
  const { auth } = useSelector((state) => state?.authState);

  const taskRef = useRef(null);

  useEffect(() => {
    taskRef?.current?.focus();
  }, []);

  const handleInputChange = useCallback((e) => {
    setTaskName(e.target.value);
    setError("");
  }, []);

  const handleSearch = useCallback((e) => {
    dispatch(searchTask(e.target.value));
  }, []);

  const handleAddButton = async () => {
    if (!taskName.trim()) {
      setError("Task Name cannot be empty");
      return;
    }

    const result = await dispatch(
      postTask({ taskName: taskName.trim(), userId: auth?.id }),
    );
    if (postTask.fulfilled.match(result)) setTaskName("");
  };

  return (
    <div className={styles["input-container"]}>
      <div className={styles["task-input-box"]}>
        <Input
          taskRef={taskRef}
          name="taskName"
          value={taskName}
          placeholder="Enter your task..."
          handleInputChange={handleInputChange}
          error={error}
        />
        <Input
          name={"SearchTask"}
          value={searchTaskValue}
          placeholder={"Enter your search..."}
          handleInputChange={handleSearch}
        />
      </div>
      <div>
        <Button
          className="btn btn-success"
          buttonText="Add"
          handleClick={handleAddButton}
        />
      </div>
    </div>
  );
};

export default ListInput;
