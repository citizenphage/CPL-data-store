import styles from "@/app/(components)/dashboard/users/singleUser/singleUser.module.css";
import { fetchUser, updateUser } from "@/app/lib/users/actions";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.firstname} {user.lastname}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>First Name</label>
          <input type="text" placeholder={user.firstname} name="firstname" />
          <label>Last Name</label>
          <input type="text" placeholder={user.lastname} name="lastname" />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
