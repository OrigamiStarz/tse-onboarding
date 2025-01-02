import { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  initialTask: Task;
}

export function TaskItem({ initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setIsLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked })
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          alert(result.error);
        }
        setIsLoading(false);
      })
      .catch((reason) => alert(reason));
  };

  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div
        className={
          task.isChecked ? styles.textContainer + " " + styles.checked : styles.textContainer
        }
      >
        <Link className={styles.router} to={"/task/" + task._id}>
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
