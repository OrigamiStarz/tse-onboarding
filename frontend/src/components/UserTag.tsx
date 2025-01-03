import { User } from "src/api/user";
import styles from "src/components/UserTag.module.css";

export interface PageProps {
  user?: User;
  className?: string;
}

export function UserTag({ user, className }: PageProps) {
  const notAssigned = user === undefined || user === null;
  return (
    <span className={styles.container + " " + className}>
      {!notAssigned && (
        <img src={user.profilePictureURL ? user.profilePictureURL : "/userDefault.svg"} alt="" />
      )}
      <p>{notAssigned ? "Not assigned" : user.name}</p>
    </span>
  );
}
