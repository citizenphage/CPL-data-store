import Card from "../(components)/dashboard/card/card";
import styles from "../(components)/dashboard/dashboard.module.css";
import RightBar from "../(components)/dashboard/rightbar/rightbar";
import Transactions from "../(components)/dashboard/transactions/transactions";
import Chart from "../(components)/dashboard/chart/chart";
import {
  countSamples,
  countEnrichments,
  countPhages,
} from "../lib/dashboard/actions";
import { FaViruses, FaMortarPestle } from "react-icons/fa";
import { LuTestTubes } from "react-icons/lu";

const { sample_count, sanple_last_month } = await countSamples();
const { enrichment_count, enrichments_last_month } = await countEnrichments();
const { phage_count, phage_last_month } = await countPhages();

const cards = [
  {
    title: "Samples Taken",
    value: `${sample_count}`,
    increase: `${sanple_last_month}`,
    timeframe: "month",
    icon: <LuTestTubes size={24} />,
  },
  {
    title: "Phages Isolated",
    value: `${phage_count}`,
    increase: `${phage_last_month}`,
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
