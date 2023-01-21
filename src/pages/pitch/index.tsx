import styles from "./page.module.css";
import { FormEvent } from "react";

export default function Pitch() {
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Hello World");
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={submitForm}>
        <input
          type="text"
          name={"fName"}
          id={styles.fName}
          placeholder={"First Name"}
        />
        <input
          type="text"
          name={"lName"}
          id={styles.lName}
          placeholder={"Last Name"}
        />
        <input
          type="text"
          name={"topicTitle"}
          id={styles.topicTitle}
          placeholder={"Topic Title"}
        />
        <input
          type="text"
          name={"topicDescription"}
          id={styles.topicDescription}
          placeholder={"Topic Description"}
        />
        <select name={"type"} id={styles.type} placeholder={"Vortragsart"}>
          <option value="Hands-On">Hands-On</option>
          <option value="Vortrag">Vortrag</option>
          <option value="Lightning Talk">Lightning Talk</option>
          <option value="Diskussionsrunde">Diskussionsrunde</option>
        </select>
        <input type="submit" value={"Submit"} id={styles.submit} />
      </form>
    </main>
  );
}
