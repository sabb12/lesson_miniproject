import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import SideBarMenu from "@/app/components/SideBarMenu/SideBarMenu";

export default function ProductManage() {
  return (
    <div>
      <Header logImage={"/images/handDrip.png"} />
      <div className={styles.bodyContainer}>
        <SideBarMenu />
        <div className={styles.bodyContent}>
          <div className={styles.title}>상품수정</div>
          <div className={styles.depthContainer}>
            <div className={styles.depth1Container}>
              <div className={styles.title}>Depth1</div>
              <div className={styles.eventListenerContainer}>
                <input type="text" />
                <button>추가</button>
              </div>
              <div className={styles.itemContainer}>
                <div className={styles.itemList}>
                  <input type="text" value={"hi"} />
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
            </div>
            <div className={styles.depth2Container}>
              <div className={styles.title}>Depth2</div>
              <div className={styles.eventListenerContainer}>
                <input type="text" />
                <button>추가</button>
              </div>
              <div className={styles.itemContainer}>
                <input type="text" />
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
            <div className={styles.depth3Container}>
              <div className={styles.title}>Depth3</div>
              <div className={styles.eventListenerContainer}>
                <input type="text" />
                <button>추가</button>
              </div>
              <div className={styles.itemContainer}>
                <input type="text" />
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
