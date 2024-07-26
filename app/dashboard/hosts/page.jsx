import styles from "@/app/(components)/dashboard/hosts/hosts.module.css";
import Search from "@/app/(components)/dashboard/search/search";
import { fetchHosts } from "@/app/lib/hosts/actions";
import Link from "next/link";

const HostsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const hosts = await fetchHosts(q);
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
            <td>Short Name</td>
            <td>Full Name</td>
            <td>Details</td>
            <td>Number of infecting phages</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {hosts.map((host) => (
            <tr key={host.id}>
              <td>{host.short_name}</td>
              <td>
                <span className={styles.species}>{host.strain}</span>
              </td>
              <td>
                <span className={styles.details}>
                  {host?.source?.reason || ""}
                </span>
              </td>
              <td>{host?.infecting_phages.length || 0}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/hosts/${host.id}`}>
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
    </div>
  );
};

export default HostsPage;
