import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page } from "src/components";

import styles from "../src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  // retrieve task
  const [task, setTask] = useState<Task>();
  const id = useParams().id; // helps retrieve route pattern
  useEffect(() => {
    getTask(id).then((result) => {
      if (result.success) {
        setTask(result.data);
      }
    });
  });

  return (
    <Page>
      <Helmet>
        <title>{task?.title + " |"} Task Details</title>
      </Helmet>
      <Link to="/">Back to home</Link>
      {/* title and edit button */}
      <div className={styles.titleDiv}>
        <p className={styles.title}>
          {task === undefined ? "This task doesn't exist!" : task?.title}
        </p>
        {task && <Button label="Edit task" className={styles.button}></Button>}
      </div>
      {/* description and details */}
      {task && (
        <>
          <p className={styles.description}>
            {task.description ? task.description : "(No description)"}
          </p>
          <div className={styles.details}>
            <p>Assignee</p>
            <span>
              {task.assignee && <img src={task.assignee.profilePictureURL} alt="Profile" />}
              <p className={styles.assignee}>
                {task.assignee ? task.assignee.name : "Not assigned"}
              </p>
            </span>
          </div>
          <div className={styles.details}>
            <p>Status</p>
            <p>{task.isChecked ? "Done" : "Not done"}</p>
          </div>
          <div className={styles.details}>
            <p>Date created</p>
            <p>
              {Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(
                task.dateCreated,
              )}
            </p>
          </div>
        </>
      )}
    </Page>
  );
}
