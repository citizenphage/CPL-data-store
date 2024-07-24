import styles from "./transactions.module.css";
import Image from "next/image";
const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Phage Updates</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Host</td>
            <td>Status</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.phage}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                CPL00076
              </div>
            </td>
            <td>
              <span className={styles.species}>Pseudomonas aeruginosa</span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.isolated}`}>
                Isolated
              </span>
            </td>
            <td>2024-07-01</td>
          </tr>
          <tr>
            <td>
              <div className={styles.phage}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                CPL00078
              </div>
            </td>
            <td>
              <span className={styles.species}>Staphylococcus aureus</span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.sequenced}`}>
                Sequenced
              </span>
            </td>
            <td>2024-07-05</td>
          </tr>
          <tr>
            <td>
              <div className={styles.phage}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                CPL00079
              </div>
            </td>
            <td>
              <span className={styles.species}>Acinetobacter baumannii</span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.annotated}`}>
                Annotated
              </span>
            </td>
            <td>2024-07-05</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
