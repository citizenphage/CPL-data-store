import styles from "@/app/(components)/dashboard/users/singleUser/singleUser.module.css";
import { fetchUser } from "@/app/lib/data";
import Image from "next/image";

const SingleUserPage = async () => {
  const user = await fetchUser();
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {user.firstname} {user.lastname}
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>First Name</label>
          <input type="text" placeholder="John" name="firstname" />
          <label>Last Name</label>
          <input type="text" placeholder="Doe" name="lastname" />
          <label>Email</label>
          <input type="email" placeholder="admin@cpl.com" name="email" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
