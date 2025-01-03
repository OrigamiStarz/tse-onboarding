import { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
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

    const taskUpdate = {
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee ? task.assignee._id : undefined,
    };

    updateTask(taskUpdate)
      .then((result) => {
        if (result.success) {
          setTask((prevTask) => ({
            ...result.data,
            assignee: prevTask.assignee,
          }));
        } else {
          alert(result.error);
        }
        setIsLoading(false);
      })
      .catch((reason) => {
        alert(reason);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.item}>
      {/* Check Button */}
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div
        className={
          task.isChecked ? styles.textContainer + " " + styles.checked : styles.textContainer
        }
      >
        <span className={styles.titleAndDesc}>
          {/* Task name */}
          <Link className={styles.router} to={"/task/" + task._id}>
            <span className={styles.title}>{task.title}</span>
          </Link>
          {/* Task description */}
          {task.description && <span className={styles.description}>{task.description}</span>}
        </span>
        {/* User Tag */}
        <UserTag user={task.assignee} className={styles.userTag} />
      </div>
    </div>
  );
}
