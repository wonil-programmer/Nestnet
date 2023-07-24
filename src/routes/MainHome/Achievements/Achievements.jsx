import { useEffect, useState } from "react";
import styles from "./Achievements.module.css";
import Achievement from "./Achievement";

class Item {
  constructor(year, details) {
    this.year = year;
    this.details = details;
  }
}

const Items = [
  new Item(2023, ["a", "b", "c"]),
  new Item(2022, ["a", "b", "c"]),
  new Item(2021, ["a", "b", "c"]),
];

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  useEffect(() => {
    setAchievements(Items);
  }, []);
  return (
    <div>
      <ul className={styles.achievements}>
        {achievements.map((achievement) => (
          <li key={achievement}>
            <Achievement
              year={achievement.year}
              details={achievement.details}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
