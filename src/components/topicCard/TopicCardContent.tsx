import styles from "./topic-card.module.css"
export default function TopicCardContent() {
  return (
    <>
      <div className={styles.overview}>
        <h4>Titel</h4>
        <div>Moderne Webentwicklung</div>
      </div>
      <div className={styles.detail}>
        <h4>Beschreibung</h4>
        <span>Lorem ipsum blablablub</span>
      </div>
    </>
  );
}