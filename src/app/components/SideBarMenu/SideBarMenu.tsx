"use client";

import { usePathname } from "next/navigation";
import styles from "./SideBarMenu.module.css";
import { useState } from "react";
import path from "path";
import Link from "next/link";

const pageObject = {
  상품등록: "pages/create/page",
  상품목록: "pages/update/page",
};
export default function SideBarMenu() {
  const [isActive, setIsActive] = useState(false);
  const [isMenuChecked, setIsMenuChecked] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  // const [selected, setSelected] = useState(["상품등록", "상품목록"]);
  const [selected, setSelected] = useState(0);
  const subNavList = ["상품등록", "상품목록"];
  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        상품관리
      </div>
      {isActive && (
        <div className={styles.dropdown_content}>
          {subNavList.map((item, i) => {
            return (
              <Link
                key={i}
                href={pageObject[item]}
                className={styles.dropdown_item}
                onClick={() => {
                  setSelected(i);
                }}
                style={{ color: selected === i ? "#66d3fa" : "#000000" }}
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}
      <div
        className={styles.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        카테고리관리
      </div>
    </div>
  );
}
