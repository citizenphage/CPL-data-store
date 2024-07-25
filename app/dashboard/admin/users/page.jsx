import Pagination from "@/app/(components)/dashboard/pagination/pagination";
import Search from "@/app/(components)/dashboard/search/search";
import styles from "@/app/(components)/dashboard/users/users.module.css";
import { deleteUser, fetchUsers } from "@/app/lib/users/actions";
import Image from "next/image";
import Link from "next/link";
const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const users = await fetchUsers(q);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a User..." />
        <Link href="/dashboard/admin/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.firstname} {user.lastname}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString() || "Unknown"}</td>
              <td>Admin</td>
              <td>{user.isActive ? "active" : "inactive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/admin/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
