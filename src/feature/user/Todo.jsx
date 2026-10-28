import styles from "./Todo.module.css";
import ListInput from "./ListInput";
import TaskList from "./TaskList";

function Todo() {
  return (
    <div className={styles["outer-container"]}>
      <ListInput />
      <TaskList />
    </div>
  );
}

export default Todo;
