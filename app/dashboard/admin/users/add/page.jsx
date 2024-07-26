import styles from "@/app/(components)/dashboard/users/addUser/addUser.module.css";
import { addUser } from "@/app/lib/users/actions";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="First Name" name="firstname" required />
        <input type="text" placeholder="Last Name" name="lastname" required />
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <select name="role" id="role">
          <option value="Administrator">Administrator</option>
          <option value="Lab Manager">Lab Manager</option>
          <option value="Researcher" selected>
            Researcher
          </option>
          <option value="Auditor">Auditor</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true} selected>
            Yes
          </option>
          <option value={false}>No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
