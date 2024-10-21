import { useRef } from "react";
import styles from "./styles.module.css"
const UserList = ({
  data,
  loading,
  handleDelete
}) => {
  const currentUserId = useRef(null)
  return (
    <>
      <ul className={styles.listContainer}>
        {data.map((item) => {
          return (
            <li className={styles.userItem} key={item.id}>
              {item.email}- {item.name}
              {currentUserId.current === item.id && loading ? "Deleting..." : <button onClick={() => handleDelete(item.id)}>Delete</button>}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserList;
