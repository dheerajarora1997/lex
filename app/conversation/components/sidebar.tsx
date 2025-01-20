// components/Sidebar.tsx
import React from "react";
import styles from "../styles/sidebar.module.scss";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <button className={styles.new_research}>
          <span className={styles.left}>New Research</span>
          <Image
            src={
              "https://storage.cloud.google.com/lex_assets/eye_hidden.png?authuser=1"
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={styles.past_researches}>
        <div className={styles.section_title}>
          <Image
            src={
              "https://storage.cloud.google.com/lex_assets/eye_hidden.png?authuser=1"
            }
            alt=""
            width={24}
            height={24}
            className={styles.left}
          />
          <span className={styles.right}>Past Researches</span>
        </div>
        <div className={styles.subsection}>
          <span className={styles.title}>This week</span>
          <ul>
            <li>Provide Judgments Interpreting Section</li>
            <li>Give Me Cases Related To The Application</li>
            <li>Show Judgments Discussing Mens Rea</li>
            <li>List Judgments Where The Principle Of</li>
          </ul>
        </div>
        <div className={styles.subsection}>
          <span className={styles.title}>Last week</span>
          <ul>
            <li>Find Judgments Involving Juveniles</li>
            <li>Search Cases Where Self-Defense</li>
            <li>Provide Cases Comparing The Sentencing</li>
            <li>Provide Landmark Murder Case</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
