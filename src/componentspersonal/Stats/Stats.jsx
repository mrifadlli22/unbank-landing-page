import React from "react";
import styles from "./Stats.module.css";

const Stats = () => {
  return (
    <section className={styles.stats}>
      <h2 className={styles.statsTitle}>Affiliated with</h2>
      <div className={styles.statsList}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>€1.5B</div>
          <div className={styles.statLabel}>Volume Processed</div>
        </div>
        
        <div className={styles.statItem}>
          <div className={styles.statValue}>210+</div>
          <div className={styles.statLabel}>Available in Countries and Territories</div>
        </div>

        <div className={styles.affiliationItem}>
         <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a318eeb446be38a53d7b25ba8dd1e13d0e76006b1d1ef976d3bf93abb74117b5?apiKey=e3ddd6dd58b748b09fc1391939743920&&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Icon" className={styles.iconImage} />
          <div className={styles.affiliationLabel}>
            Tennet Supervisory Organizations
          </div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValue}>80K+</div>
          <div className={styles.statLabel}>Trusting Users and Growing</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValue}>100+</div>
          <div className={styles.statLabel}>Expert Team Members</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
