import Pagination from "@/app/(components)/dashboard/pagination/pagination";
import Search from "@/app/(components)/dashboard/search/search";
import styles from "@/app/(components)/dashboard/hosts/hosts.module.css";
import Link from "next/link";

const HostsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a host..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Source</td>
            <td>Phage Count</td>
            <td>Location</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className={styles.species}>Escherichia coli</span> BW25113
            </td>
            <td>Wolfram Mobius (Exeter)</td>
            <td>213</td>
            <td>A118 (B1-B4)</td>
            <td>
              <span className={`${styles.status} ${styles.annotated}`}>
                Annotated
              </span>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href="/">
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className={`${styles.button} ${styles.archive}`}>
                    Archive
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default HostsPage;
