"use client";

import styles from "./page.module.css";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Product } from "@/repositories/products/types";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import Header from "@/components/Header/Header";
import SideBarMenu from "@/components/SideBarMenu/SideBarMenu";
import dayjs from "dayjs";

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
      <Header logImage={"/images/handDrip.png"} />
      <div className={styles.bodyContainer}>
        <SideBarMenu />

        <div className={styles.bodyContent}>
          <div className={styles.title}>상품목록</div>
          <div className={styles.listHeader}>
            <div className={styles.totalCount}>0</div>
            <button
              onClick={function () {
                window.location.href = "/products/create";
              }}
            >
              등록
            </button>
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
                <div key={product.id} className={styles.item}>
                  <div>{i + 1}</div>
                  <div>{product.id}</div>
                  <div
                    onClick={function () {
                      window.location.href = `/products/${product.id}`;
                      // ProductsRepository.update(product.id)
                    }}
                  >
                    {product.name}
                  </div>
                  <div>{product.status}</div>
                  <div>{dayjs(product.createdAt).format("YYYY/MM/DD")}</div>
                  <div>{dayjs(product.updatedAt).format("YYYY/MM/DD")}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
