import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdLogout,
  MdSupervisedUserCircle,
  MdLocalShipping,
} from "react-icons/md";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import { FaViruses, FaBacteria, FaBlog } from "react-icons/fa";
import { LuTestTubes } from "react-icons/lu";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Phages",
        path: "/dashboard/phages",
        icon: <FaViruses />,
      },
      {
        title: "Hosts",
        path: "/dashboard/hosts",
        icon: <FaBacteria />,
      },
      {
        title: "Samples",
        path: "/dashboard/samples",
        icon: <LuTestTubes />,
      },
    ],
  },
  {
    title: "Admin",
    list: [
      {
        title: "Users",
        path: "/dashboard/admin/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Blog Posts",
        path: "/dashboard/admin/blog",
        icon: <FaBlog />,
      },
      {
        title: "Shipping",
        path: "/dashboard/admin/shipping",
        icon: <MdLocalShipping />,
      },
    ],
  },
];

const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Ben Temperton</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
