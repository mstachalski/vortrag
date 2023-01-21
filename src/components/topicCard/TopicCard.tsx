
import styles from "./topic-card.module.css";
import TopicCardContent from "@/components/topicCard/TopicCardContent";


interface TopicCardProps {
  side: "left" | "right";
}

export default function TopicCard({ side }: TopicCardProps) {
  return (
    <div className={`${styles.card} ${styles[side]}`} onClick={() => console.log("hello world")}>
        <TopicCardContent />
    </div>
  );
}
