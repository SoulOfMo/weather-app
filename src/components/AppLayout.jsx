import styles from "./AppLayout.module.css";

function AppLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default AppLayout;
