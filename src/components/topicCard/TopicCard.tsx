import styles from "./topic-card.module.css";
import TopicCardContent from "@/components/topicCard/TopicCardContent";
import { z } from "zod";
import { Topics } from "@/schemas/topicSchema";
import { useEffect, useState } from "react";

type Topic = z.infer<typeof Topics.element>;

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  hasVoted: boolean;
}

export default function TopicCard({
  topic,
  onClick,
  hasVoted,
}: TopicCardProps) {
  const [voted, setVoted] = useState(hasVoted);

  useEffect(() => {
    setVoted(hasVoted);
  }, [hasVoted]);

  return (
    <div
      className={`${styles.card}`}
      onClick={() => {
        setVoted(prev => !prev)
        onClick();
      }}
    >
      {voted && <div className={styles.voted}></div>}
      <TopicCardContent topic={topic} />
    </div>
  );
}
