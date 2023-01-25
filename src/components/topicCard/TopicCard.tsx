
import styles from "./topic-card.module.css";
import TopicCardContent from "@/components/topicCard/TopicCardContent";
import {z} from "zod";
import {Topics} from "@/schemas/topicSchema";

type Topic = z.infer<typeof Topics.element>

interface TopicCardProps {
  side: "left" | "right";
  topic: Topic;
  onClick: () => void;
}

export default function TopicCard({ side, topic, onClick}: TopicCardProps) {
  return (
    <div className={`${styles.card}`} onClick={onClick}>
        <TopicCardContent topic={topic}/>
    </div>
  );
}
