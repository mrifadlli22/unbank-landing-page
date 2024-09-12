/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./OTCDeskWebsite.module.css";

function ProblemCard({ icon, title, description }) {
  return (
    <div className={styles.problemCard}>
      <img src={icon} alt="" className={styles.problemIcon} />
      <h3 className={styles.problemTitle}>{title}</h3>
      <p className={styles.problemDescription}>{description}</p>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf88e7341d50e480c46147331a8cbe83080c598ab662e985c5428fa3d2c48f50?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
      title: "Vulnerability",
      description:
        "Current exchange platforms (Whatsapp, Telegram, Skype, etc.) pose significant vulnerability risk. Hackers can infiltrate and hijack trades, resulting in the loss of millions of dollars.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a9df524c3752f3d95fb82882ee66996475e09d860a4faee5e12976e41bb3fc05?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
      title: "No discovery",
      description:
        "Lack of discovery tools for more legitimate and verified sources prevents small and medium-sized funds from being found and prevents growth, restricting the industry to remain stagnant as more significant players in the space receive all the traffic.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1dae8194074b29d65c2b8d080f77ff2e40b60c236aa1e2dab474c5f23df3bff7?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
      title: "Transparency",
      description:
        "The layer of anonymity that OTC trading provides prevents the collection of valuable data on OTC traders.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6672aa80e3d9d6e93b0a4326655964c0323a39668aee2f089900a80dc726155?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
      title: "Distributed",
      description:
        "There are too many platforms that exist and it can be challenging to keep track of all of them.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fdc293fef4c4639550b4cf331e745492136ecdc447e88a8f6a3e760081eaf9d8?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
      title: "No end-to-end solution",
      description: "No platform currently offers a complete solution.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/16e58fcfb874c71895112900573c17fe213e291b3f494a98035ee51486750b40?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
      title: "Inefficient",
      description:
        "Long, slow, lengthy, and inefficient trading process. Current platforms can take hours or even days.",
    },
  ];

  return (
    <section className={styles.problemSection}>
      <h2 className={styles.sectionTitle}>
        The problem:{" "}
        <span className={styles.lightText}>An Outdated Process</span>
      </h2>
      <div className={styles.problemGrid}>
        {problems.map((problem, index) => (
          <React.Fragment key={index}>
            <ProblemCard {...problem} />
            {index % 2 === 0 && index < problems.length - 1 && (
              <div className={styles.verticalDivider} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default ProblemSection;
