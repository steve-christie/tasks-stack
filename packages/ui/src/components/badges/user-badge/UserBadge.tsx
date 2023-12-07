import styles from "./UserBadge.module.less";

export default (props: { name: string }) => {
  const initials = props.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");

  return <div className={styles.userBadge}>{initials}</div>;
};
