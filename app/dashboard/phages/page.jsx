import Pagination from "@/app/(components)/dashboard/pagination/pagination";
import Search from "@/app/(components)/dashboard/search/search";
import styles from "@/app/(components)/dashboard/phages/phages.module.css";
import { fetchPhages } from "@/app/lib/phages/actions";

import Link from "next/link";
const PhagesPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, phages } = await fetchPhages(q, page);

  const statusStyles = {
    isolated: styles.isolated,
    purified: styles.purified,
    sequenced: styles.sequenced,
    annotated: styles.annotated,
    // Add more status-to-style mappings here
    // For example:
    // anotherStatus: styles.anotherStyle
  };

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
            <td>Name</td>
            <td>Version</td>
            <td>Genome Size</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {phages.map((phage) => (
            <tr key={phage.id}>
              <td>{phage.full_name}</td>
              <td>{phage.version}</td>
              <td>0</td>
              <td>
                <span
                  className={`${styles.status} ${statusStyles[phage.status]}`}
                >
                  {phage.status}
                </span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/phages/${phage.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <Link href={`/dashboard/phages/${phage.id}/addProcess`}>
                    <button className={`${styles.button} ${styles.addProcess}`}>
                      Add Process
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default PhagesPage;
