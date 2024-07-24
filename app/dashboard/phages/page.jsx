import Pagination from "@/app/(components)/dashboard/pagination/pagination";
import Search from "@/app/(components)/dashboard/search/search";
import styles from "@/app/(components)/dashboard/phages/phages.module.css";
import Link from "next/link";
const PhagesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a phage..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Short Name</td>
            <td>Given Name</td>
            <td>Host</td>
            <td>Genome Size</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CPL00001</td>
            <td>BinglyBong</td>
            <td>
              <span className={styles.species}>Pseudomonas aeruginosa</span>{" "}
              PAO1
            </td>
            <td>123,456</td>
            <td>
              <span className={`${styles.status} ${styles.isolated}`}>
                Isolated
              </span>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href="/">
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>CPL00002</td>
            <td>DestyDues</td>
            <td>
              <span className={styles.species}>Escherichia coli</span> BW2
            </td>
            <td>42,735</td>
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
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default PhagesPage;
