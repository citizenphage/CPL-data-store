import styles from "@/app/(components)/dashboard/phages/singlePhage/singlePhage.module.css";
import PhageProcess from "@/app/(components)/dashboard/phages/phageProcess/process";
import { fetchPhage } from "@/app/lib/phages/actions";
import Link from "next/link";

const SinglePhagePage = async ({ params }) => {
  const { id } = params;
  const phage = await fetchPhage(id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{phage.full_name}</h2>
        <div className={styles.buttons}>
          <Link href={`/dashboard/phages/report/${id}}`}>
            <button className={`${styles.button} ${styles.view}`}>
              Generate Report
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.source}>
        <h2>Source</h2>
        <table className={styles.source}>
          <tbody>
            <tr>
              <td className={styles.rowLabel}>Isolation Host: </td>
              <td>{phage.source.isolation_host.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Processes</h2>
      <div className={styles.processes}>
        {phage.processes?.map((process) => (
          <PhageProcess item={process} key={process.id} />
        ))}
      </div>
    </div>
  );
};

export default SinglePhagePage;
