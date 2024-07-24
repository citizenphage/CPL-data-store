import styles from "@/app/(components)/dashboard/phages/addPhage/addPhage.module.css";
const AddPhagePage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="test" name="test" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPhagePage;
