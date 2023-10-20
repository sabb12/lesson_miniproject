import styles from "./page.module.css";

import Header from "../components/Header/Header";
import SideBarMenu from "../components/SideBarMenu/SideBarMenu";

export default function CategoriesListPage() {
  return (
    <div>
      <Header />
      <div className={styles.bodyContainer}>
        <SideBarMenu />

        <div className={styles.bodyContent}>카테고리관리</div>
      </div>
    </div>
  );
}
