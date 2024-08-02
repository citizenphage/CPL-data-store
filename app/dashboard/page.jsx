import Card from "../(components)/dashboard/card/card";
import styles from "../(components)/dashboard/dashboard.module.css";
import RightBar from "../(components)/dashboard/rightbar/rightbar";
import Transactions from "../(components)/dashboard/transactions/transactions";
import Chart from "../(components)/dashboard/chart/chart";
import { countSamples, countEnrichments } from "../lib/dashboard/actions";
import { FaViruses, FaMortarPestle } from "react-icons/fa";
import { LuTestTubes } from "react-icons/lu";
import { MdSupervisedUserCircle } from "react-icons/md";

const { sample_count, sanple_last_month } = await countSamples();
const { enrichment_count, enrichments_last_month } = await countEnrichments();

const cards = [
  {
    title: "Registered Hunters",
    value: 120,
    increase: 10,
    timeframe: "month",
    icon: <MdSupervisedUserCircle size={24} />,
  },
  {
    title: "Samples Taken",
    value: `${sample_count}`,
    increase: `${sanple_last_month}`,
    timeframe: "month",
    icon: <LuTestTubes size={24} />,
  },
  {
    title: "Phages Isolated",
    value: 1000,
    increase: 100,
    timeframe: "month",
    icon: <FaViruses size={24} />,
  },
  {
    title: "Enrichments performed",
    value: `${enrichment_count}`,
    increase: `${enrichments_last_month}`,
    timeframe: "month",
    icon: <FaMortarPestle size={24} />,
  },
];

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((card) => (
            <Card item={card} key={card.title} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  );
};

export default Dashboard;
