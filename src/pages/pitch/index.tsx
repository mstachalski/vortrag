import styles from "./page.module.css";
import { z } from "zod";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Pitch() {
  //Todo
  const topicSchema = z.null();

  type IFormData = z.infer<typeof topicSchema>;

  //TODO Felder aus useForm holen und hier destructuren
  const {  } = useForm({
    resolver: zodResolver(topicSchema),
  });

  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={() => null} //Todo
      >
        <div className={styles.inputContainer}>
          {
            //TODO fehlerLabel
          }
          <input
            type="text"
            id={styles.fName}
            placeholder={"First Name"}
          />
        </div>
        <div className={styles.inputContainer}>
          {
            //TODO Fehlerlabel
          }
          <input
            type="text"
            id={styles.lName}
            placeholder={"Last Name"}
          />
        </div>
        <div className={styles.inputContainer}>
          {
            //Todo fehlerlabel
          }
          <input
            type="text"
            id={styles.topicTitle}
            placeholder={"Topic Title"}
          />
        </div>
        <div className={styles.inputContainer}>
          {
            //TODO Fehlerlabel
          }
          <textarea
            wrap={"soft"}
            maxLength={150}
            id={styles.topicDescription}
            placeholder={"Topic Description"}
          />
          <span className={styles.charactersLeft}>
            {
              //TODO Anzeigen wieviele Zeichen noch für Description übrig sind
            }
          </span>
        </div>
        <select
          id={styles.type}
          placeholder={"Vortragsart"}
        >
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
