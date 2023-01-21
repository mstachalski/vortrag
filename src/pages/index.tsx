import Link from "next/link";

import styles from "../styles/page.module.css";
import TopicCard from "@/components/topicCard/TopicCard";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>GFT Ballot</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.votingarea}>
          <TopicCard side={"left"} />
          <span>vs.</span>
          <TopicCard side={"right"} />
        </section>
        <Link href={"/pitch"} className={styles.cta}>
          Pitch your own
        </Link>
      </main>
    </>
  );
}