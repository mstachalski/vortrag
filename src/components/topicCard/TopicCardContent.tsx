import styles from "./topic-card.module.css"
import {z} from "zod";
import {Topics} from "@/schemas/topicSchema";

type Topic = z.infer<typeof Topics.element>

export default function TopicCardContent({topic}: {topic: Topic}) {
  return (
    <>
      <div className={styles.overview}>
        <h4>Titel</h4>
        <div>{topic.title}</div>
      </div>
      <div className={styles.detail}>
        <h4>Beschreibung</h4>
        <span>{topic.description}</span>
      </div>
    </>
  );
}