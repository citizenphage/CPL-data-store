import styles from "@/app/(components)/dashboard/phages/singlePhage/singlePhage.module.css";
import Link from "next/link";

const SinglePhagePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pseudomonas phage CPL00001</h2>
        <div className={styles.buttons}>
          <Link href={`/dashboard/phages/report/test`}>
            <button className={`${styles.button} ${styles.view}`}>
              Generate Report
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.source}>
        <h2>Source</h2>
      </div>
      <div className={styles.assembly}>
        <h2>Assembly</h2>
        <table className={styles.assemblyTable}>
          <tbody>
            <tr>
              <td className={styles.rowLabel}>Date Sequenced</td>
              <td>2023-10-16</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Sequencing Centre</td>
              <td>University of Exeter</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Sequencing Type</td>
              <td>Illumina 2 x 250bp reads</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Number of Reads</td>
              <td>3,000,000</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Production Host</td>
              <td>Pseudomonas aeruginosa</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Percentage host reads</td>
              <td>2.11%</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Best assembly method</td>
              <td>Unicycler</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Assembly Graph**</td>
              <td>INSERT IMG HERE</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Number of phage contigs</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.annotation}>
        <h2>CPL00947</h2>
        <table className={styles.annotationTable}>
          <tbody>
            <tr>
              <td className={styles.rowLabel}>Genome Length</td>
              <td>66,281 bp</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>CheckV</td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Genome Quality</td>
              <td>High Quality</td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Estimated Completeness</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Lifestyle</td>
              <td>Virulent</td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Method Used</td>
              <td>PhageLeads</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Genes of Concern**</td>
              <td>None</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Variants Detected</td>
              <td>No</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Genome Coverage</td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Mean Coverage</td>
              <td>2354 x</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>INSERT IMAGE HERE</td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Taxonomy</td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>
                Closest Known Match*** (Accession Number)
              </td>
              <td>Pseudomonas phage chumba (MT119375)</td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Estimated Distance</td>
              <td>0.01</td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Estimated Distance Method</td>
              <td>Mash</td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Predicted Family</td>
              <td>Pbunavirus</td>
            </tr>
            <tr>
              <td className={styles.rowSubLabel}>Predicted Genus</td>
              <td>Pbunavirus</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.receptors}>
        <h2>Receptors</h2>
        <table className={styles.receptorsTable}>
          <tbody>
            <tr>
              <td className={styles.rowLabel}>Predicted Receptor</td>
              <td>LPS and/or Type IV pili</td>
            </tr>
            <tr>
              <td className={styles.rowLabel}>Prediction Method</td>
              <td>Screen against host knockout library</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.genomeMap}>
        <h2>Genome Map</h2>
        IMG goes here
      </div>
    </div>
  );
};

export default SinglePhagePage;
