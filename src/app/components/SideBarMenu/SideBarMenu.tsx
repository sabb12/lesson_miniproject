"use client";

import { usePathname } from "next/navigation";
import styles from "./SideBarMenu.module.css";
import { useState } from "react";

export default function SideBarMenu() {
  const [isActive, setIsActive] = useState(false);

  const pathname = usePathname();

  const subNavList = [
    { list: "상품등록", path: "/products/create" },
    { list: "상품목록", path: "/products" },
  ];
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
              <div
                key={i}
                className={styles.dropdown_item}
                onClick={() => {
                  window.location.href = item.path;
                }}
                style={{
                  color: item.path === pathname ? "#66d3fa" : "#000000",
                }}
              >
                {item.list}
              </div>
            );
          })}
        </div>
      )}
      <div
        className={styles.dropdown_btn}
        onClick={(e) => {
          window.location.href = "/products/productManage";
        }}
        style={{
          color: pathname === "/products/productManage" ? "#66d3fa" : "#000000",
        }}
      >
        카테고리관리
      </div>
    </div>
  );
}
