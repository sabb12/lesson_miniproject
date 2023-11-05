/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { Product } from "@/repositories/products/types";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import SideBarMenu from "@/app/components/SideBarMenu/SideBarMenu";
import Header from "@/app/components/Header/Header";
import { useParams } from "next/navigation";
import ImageList from "../components/ImageList";

export default function UpdatePage() {
  // params은 문자열이다
  const params = useParams();

  const productId = Number(params.productId) || 0;
  console.log(productId);
  const [updateForm, setUpdateForm] = useState<Product>();
  console.log("updateForm", updateForm);
  const statusRadioGroup = [
    { statusValue: "READY", statusLabel: "판매대기" },
    { statusValue: "ON_SALE", statusLabel: "판매중" },
    { statusValue: "END_SALE", statusLabel: "판매완료" },
  ];
  // 페이지최조 진입시
  // 해당id로데이터 가져와서
  // 렌더링해준다
  useEffect(function () {
    ProductsRepository.getById(productId).then(function (data) {
      setUpdateForm(data[0]);
    });
    // then을 사용
  }, []);

  // 상품이름을 클릭 했을 대 /products/1176
  // /products/1

  // 규칙 만들기 => `/products/${상품아이디}`

  return (
    <div>
      <Header logImage={"/images/handDrip.png"} />
      <div className={styles.bodyContainer}>
        <SideBarMenu />

        <div className={styles.bodyContent}>
          <div className={styles.title}>상품수정</div>
          <div className={styles.updateFormContainer}>
            <div className={styles.idContainer}>
              <div className={styles.heaader}>아이디</div>
              <input
                type="text"
                value={updateForm?.id}
                onChange={function (e) {
                  console.log("updateForm :", updateForm);
                }}
              />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.header}>상품명</div>
              <input
                type="text"
                value={updateForm?.name}
                onChange={function (e) {}}
              />
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.header}>대표이미지</div>
              <div className={styles.imageList}>
                <ImageList
                  imageUrlList={updateForm?.imageUrlList}
                  // imageUrlList={updateForm?.imageUrlList.filter(
                  //   (image) => !image.includes("blob")
                  // )}
                  updateImageList={function (newImageUrlList) {
                    console.log("updateForm :", newImageUrlList);
                    const newUpdateForm = {
                      ...updateForm,
                      imageUrlList: newImageUrlList,
                    };
                    setUpdateForm(newUpdateForm);
                  }}
                />

                {/* {updateForm.imageUrlList.length < 5 && (
                  <input
                    style={{
                      width: 100,
                      height: 100,
                      border: "1px solid red",
                    }}
                    type="file"
                    onChange={function (e) {
                      if (!e.target.files) {
                        alert("파일이 없다");
                        return;
                      }
                      const file = e.target.files[0];
                      const imageUrl = URL.createObjectURL(file);
                      const newImageUrlList = {
                        ...updateForm,
                        imageUrlList: [...updateForm.imageUrlList, imageUrl],
                      };
                      setUpdateForm(newImageUrlList);
                    }}
                  />
                )} */}
              </div>
            </div>
            <div className={styles.categoryContainer}>
              <div className={styles.header}>카테고리</div>
              <select>
                <option key="light" value="light">
                  조명
                </option>
              </select>
              {`>`}
              <select onChange={function (e) {}}>
                <option key="단스텐드" value="단스텐드">
                  단스텐드
                </option>
                <option key="leo" value="leo">
                  leo
                </option>
                <option key="hi" value="hi">
                  hi
                </option>
              </select>
              {`>`}
              <select>
                <option key="라이트">라이트</option>
              </select>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.header}>가격</div>
              <input
                type="number"
                value={updateForm?.price}
                onChange={function (e) {}}
              />
            </div>
            <div className={styles.statusContainer}>
              <div className={styles.header}>상태</div>
              <div className={styles.statusRadioGroup}>
                {statusRadioGroup.map(({ statusValue, statusLabel }, i) => {
                  return (
                    <div key={i}>
                      <input
                        type="radio"
                        name="status"
                        id={`status${statusValue}`}
                        value={statusValue}
                        onChange={function (e) {}}
                      />
                      <label htmlFor={`status${statusValue}`}>
                        {statusLabel}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.createdUpdatedDateContainer}>
              <div className={styles.createdContainer}>
                <div className={styles.header}>생성일</div>
                <div onChange={function (e) {}}>hi</div>
              </div>
              <div className={styles.updatedDateContainer}>
                <div className={styles.header}>수정일</div>
                <div onChange={function (e) {}}>bye</div>
              </div>
            </div>
          </div>
          <div className={styles.eventListenerContainer}>
            <button
              onClick={function () {
                window.location.href = "/products";
              }}
            >
              취소
            </button>
            <button
              onClick={function () {
                // console.log("updateForm :", updateForm);
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
