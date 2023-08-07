import styles from "./SideBar.module.css";

export default function SideBar() {
  const arr = [
    "동아리 소개",
    "자유 게시판",
    "개발 게시판",
    "진로 게시판",
    "족보 게시판",
    "스터디",
  ];
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