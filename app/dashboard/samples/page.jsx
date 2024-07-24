import Pagination from "@/app/(components)/dashboard/pagination/pagination";
import Search from "@/app/(components)/dashboard/search/search";
import styles from "@/app/(components)/dashboard/samples/samples.module.css";
import Link from "next/link";
import { fetchSamples } from "@/app/lib/data";
const SamplesPage = async () => {
  const samples = await fetchSamples();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a sample..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Type</td>
            <td>Source</td>
            <td>Phage Count</td>
            <td>Location</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr key={sample.id}>
              <td>{sample.type}</td>
              <td>{sample.w3w}</td>
              <td>0</td>
              <td>Box 1 Vial 4 (Cold Store)</td>
              <td>
                <span className={`${styles.status} ${sample.status}`}>
                  {sample.status}
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
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default SamplesPage;
