"use client";
import styles from "./styles.module.css"

const UserForm = ({ onAddUser }) => {

  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: event.target.fname.value,
      email: event.target.email.value,
    }
    onAddUser(user);
  };

  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <label htmlFor="fname">First name:</label>
      <input type="text" id="fname" name="fname" defaultValue="John" required />
      <label htmlFor="lname">Email:</label>
      <input type="email" id="email" name="email" defaultValue="John.Doe@mail.com" required />
      <button type="submit">submit</button>
    </form>
  );
};

export default UserForm;
