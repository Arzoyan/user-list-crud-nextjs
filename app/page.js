"use client";

import UserList from "./componnets/list/List";
import useFetchData from "./hooks/useFetchData";
import styles from "./page.module.css";
import UserForm from "./componnets/form/UserForm";
import { useState } from "react";

export default function Home() {
  const {
    data,
    loading,
    error,
    fetchData: getUsers,
  } = useFetchData({ url: "/api/users" });
  const {
    loading: addUserLoading,
    error: addUserError,
    fetchData: sendNewUser,
  } = useFetchData({ url: "/api/users", method: "POST" });
  const { loading: deleteUserLoading, fetchData: deleteUser } = useFetchData({
    url: "/api/users",
    method: "DELETE",
  });
  const [isAddUser, setIsAddUser] = useState(false);
  if (loading || addUserLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleToggleUserForm = () => {
    setIsAddUser((prev) => !prev);
  };

  const handleAddUser = async (user) => {
    const onAfterUserAdd = () => {
      handleToggleUserForm();
      getUsers();
    };
    await sendNewUser(user, onAfterUserAdd);
  };

  const handleDelete = async (id) => {
    await deleteUser({ id });
    await getUsers();
  };

  return (
    <div className={styles.page}>
      <h2>User List</h2>
      <div>
        <button className={styles.addBtn} onClick={handleToggleUserForm}>
          {isAddUser ? "Back To List" : "Add User"}
        </button>
        {isAddUser ? (
          <UserForm onAddUser={handleAddUser} />
        ) : (
          data && (
            <UserList
              loading={deleteUserLoading}
              handleDelete={handleDelete}
              data={data}
            />
          )
        )}
        {!!addUserError && <p className={styles.error}>{addUserError}</p>}
      </div>
    </div>
  );
}
