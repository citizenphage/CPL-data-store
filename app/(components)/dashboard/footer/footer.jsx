import Image from "next/image";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.v3.png" width={50} height={50} alt="" />
        Citizen Phage Library
      </div>
      <div className={styles.text}>©️ All Rights Reserved</div>
    </div>
  );
};

export default Footer;
