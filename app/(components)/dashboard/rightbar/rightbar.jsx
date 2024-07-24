import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt="" fill className={styles.bg} />
        </div>
        <div className={styles.text}></div>
        <span className={styles.notification}> Available Now</span>
        <h3 className={styles.title}>
          How to use the new version of the admin dashboard
        </h3>
        <span className={styles.subtitle}>Takes 4 minutes to learn</span>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          egestas luctus auctor. Mauris ac diam sed augue consequat dictum. Nunc
          nibh urna, porta eu ultricies ut, tristique pulvinar mi.
        </p>
        <button className={styles.button}>
          <MdPlayCircleFilled />
          Watch
        </button>
      </div>
      <div className={styles.item}>
        <div className={styles.text}></div>
        <span className={styles.notification}> Coming Soon</span>
        <h3 className={styles.title}>
          How to use the new version of the admin dashboard
        </h3>
        <span className={styles.subtitle}>Takes 4 minutes to learn</span>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          egestas luctus auctor. Mauris ac diam sed augue consequat dictum. Nunc
          nibh urna, porta eu ultricies ut, tristique pulvinar mi.
        </p>
        <button className={styles.button}>
          <MdReadMore />
          Learn
        </button>
      </div>
    </div>
  );
};

export default RightBar;
