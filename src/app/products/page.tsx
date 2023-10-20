"use client";

import styles from "./page.module.css";

import Header from "../components/Header/Header";
import SideBarMenu from "../components/SideBarMenu/SideBarMenu";
import { useState, useEffect, use } from "react";
import { Product } from "@/repositories/products/types";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";

export default function ProductListPage() {
  const [itemList, setItemList] = useState<Product[]>([]);
  // console.log(styles.productListContainer);
  // 고요 하게 만들어 준다

  useEffect(function () {
    ProductsRepository.getList().then(function (data) {
      setItemList(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.bodyContainer}>
        <SideBarMenu />

        <div className={styles.bodyContent}>
          <div className={styles.title}>상품목록</div>
          <div className={styles.listHeader}>
            <div className={styles.totalCount}>0</div>
            <button>등록</button>
          </div>
          <div className={styles.productList}>
            <div className={styles.header}>
              <div>NO.</div>
              <div>아이디</div>
              <div>이름</div>
              <div>판매상태</div>
              <div>생성일</div>
              <div>수정일</div>
            </div>
            {itemList.map(function (product, i) {
              return (
                <div key={i} className={styles.item}>
                  <div>1</div>
                  <div>123123123</div>
                  <div>상품12</div>
                  <div>판매중</div>
                  <div>2023.09.02 02:23:23</div>
                  <div>3030.09.02 02:23:23</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
