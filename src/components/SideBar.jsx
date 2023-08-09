import styles from "./SideBar.module.css";

export default function SideBar() {
  const arr = ["통합 게시판", "족보 게시판", "갤러리"];
  return (
    <div className={styles.sideBar}>
      <ul className={styles.contents}>
        {arr.map((ele, idx) => (
          <li className={styles.content} key={idx}>
            <button className={styles.btn}>{ele}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
