import styles from "@/app/(components)/dashboard/hosts/hosts.module.css";
import Pagination from "@/app/(components)/dashboard/pagination/pagination";
import Search from "@/app/(components)/dashboard/search/search";
import { fetchHostsWithCounts } from "@/app/lib/hosts/actions";
import Link from "next/link";

const HostsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, hosts } = await fetchHostsWithCounts(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Host..." />
        <Link href="/dashboard/hosts/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Full Name</td>
            <td>Details</td>
            <td>Number of infecting phages</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {hosts.map((host) => (
            <tr key={host._id}>
              <td>
                <span className={styles.species}>{host.full_name}</span>
              </td>
              <td>
                <span className={styles.details}>
                  {host?.source?.reason || ""}
                </span>
              </td>
              <td>{host?.phageCount || 0}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/hosts/${host._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
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

export default HostsPage;
