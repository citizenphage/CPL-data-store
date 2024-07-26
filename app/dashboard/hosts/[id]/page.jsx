import styles from "@/app/(components)/dashboard/hosts/singleHost/singleHost.module.css";
import { fetchHost } from "@/app/lib/hosts/actions";

import Image from "next/image";

const SingleHostPage = async ({ params }) => {
  const { id } = params;
  const host = await fetchHost(id);
  return (
    <div className={styles.container}>
      <h2>{host.strain}</h2>
      <div className={styles.source}>
        <span className={styles.title}>Source</span>
      </div>
      <div className={styles.genome}>
        <span className={styles.title}>Genome</span>
      </div>

      <div className={styles.growth}>
        <span className={styles.title}>Preferred growth conditions</span>
      </div>
      <div className={styles.processes}>
        <span className={styles.title}>Processes</span>
      </div>
    </div>
  );
};

export default SingleHostPage;
