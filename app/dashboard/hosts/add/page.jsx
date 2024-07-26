import styles from "@/app/(components)/dashboard/hosts/addHost/addHost.module.css";
import { addHost } from "@/app/lib/hosts/actions";

const AddHostPage = () => {
  return (
    <div className={styles.container}>
      <form action={addHost} className={styles.form}>
        <h2>Name</h2>
        <input
          type="text"
          placeholder="Short name"
          name="short_name"
          required
        />
        <input type="text" placeholder="Genus" name="genus" required />
        <input type="text" placeholder="Species" name="species" required />
        <input type="text" placeholder="Strain" name="strain" required />

        <h2>Source</h2>
        <input
          type="text"
          placeholder="institution"
          name="institution"
          required
        />
        <input
          type="text"
          placeholder="contact email"
          name="contact_email"
          required
        />
        <textarea placeholder="Reason" name="reason" />
        <h2>Reference Genome</h2>

        <input type="text" placeholder="genome url" name="external_url" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHostPage;
