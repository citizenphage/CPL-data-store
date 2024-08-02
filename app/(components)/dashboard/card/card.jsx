import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      {item.icon}
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{item.value}</span>
        <span className={styles.detail}>
          <span
            className={item.increase > 0 ? styles.positive : styles.neutral}
          >
            {item.increase}
          </span>{" "}
          more in the previous {item.timeframe}
        </span>
      </div>
    </div>
  );
};

export default Card;
