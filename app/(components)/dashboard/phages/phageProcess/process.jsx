import styles from "./process.module.css";

const statusStyles = {
  isolation: styles.isolated,
  purification: styles.purified,
  sequenced: styles.sequenced,
  annotated: styles.annotated,
  // Add more status-to-style mappings here
  // For example:
  // anotherStatus: styles.anotherStyle
};

const PhageProcess = ({ item }) => {
  return (
    <div className={`${styles.container} ${statusStyles[item.get("type")]}`}>
      <div className={styles.texts}>
        <span className={styles.type}>
          {item.get("type")[0].toUpperCase() + item.get("type").slice(1)}
        </span>
        <span className={styles.date}>
          {item.date?.toISOString().split("T")[0] || "date missing"}
        </span>
        <span className={styles.by}>{item.get("by") || "actor missing"}</span>
      </div>
    </div>
  );
};

export default PhageProcess;
