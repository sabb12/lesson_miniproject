"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { Product } from "@/repositories/products/types";
import * as ProductsRepository from "@/repositories/products/ProductsRepository";
import * as CategoryRepository from "@/repositories/categories/CategoryRepository";
import SideBarMenu from "@/app/components/SideBarMenu/SideBarMenu";
import Header from "@/app/components/Header/Header";
import ImageList from "../components/ImageList";
import { Category } from "@/repositories/categories/types";
import { supabase } from "@/repositories";
import { error } from "console";

type ProductStatus = "READY" | "ON_SALE" | "END_SALE";

type ProductForm = {
  id: number;
  name: string;
  imageFileList: File[];
  category1Id: number;
  category2Id: number;
  category3Id: number;
  price: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
};
// "https://www.shutterstock.com/image-vector/free-sticker-sign-vector-illustration-260nw-1156988017.jpg",
// "https://media.istockphoto.com/id/1433211776/photo/woman-silhouette-in-front-of-the-ocean-at-sunset.webp?b=1&s=170667a&w=0&k=20&c=xGzw_4wTjK0uKJLS42lR7xPsD7tGRTrx-mWBl0ylih4=",
const DEFAULT_PRODUCT_FROM: ProductForm = {
  id: 0,
  name: "",
  imageFileList: [],
  category1Id: 0,
  category2Id: 0,
  category3Id: 0,
  price: 0,
  status: "READY",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function UpdatePage() {
  const [createForm, setCreateForm] =
    useState<ProductForm>(DEFAULT_PRODUCT_FROM);
  const [depth1, setDepth1] = useState<Category[]>([]);
  const [depth2, setDepth2] = useState<Category[]>([]);
  const [depth3, setDepth3] = useState<Category[]>([]);

  const statusRadioGroup = [
    { statusValue: "READY", statusLabel: "판매대기" },
    { statusValue: "ON_SALE", statusLabel: "판매중" },
    { statusValue: "END_SALE", statusLabel: "판매완료" },
  ];
  useEffect(() => {
    CategoryRepository.getList({ depth: 1 }).then(function (data) {
      console.log("data :", data);
      setDepth1(data);
    });
  }, []);

  const uploadImageList = function (fileList: File[]) {
    console.log("fileList:", fileList);
    const promiseList = fileList.map(function (file, i) {
      return new Promise(function (resolve) {
        const filename = `${file.name}-${Date.now()}`;
        console.log("filename:", filename);
        supabase.storage
          .from("products")
          .upload(filename, file)
          .then(function ({ data, error }) {
            console.log("error :", error);
            console.log("i, data?.path :", i, data?.path);
            resolve(data?.path);
          })
          .catch(function (error) {
            console.log("errorrr :", error);
          });
      });
    });
    return Promise.all(promiseList);
  };

  return (
    <div>
      <Header logImage={"/images/handDrip.png"} />
      <div className={styles.bodyContainer}>
        <SideBarMenu />

        <div className={styles.bodyContent}>
          <div className={styles.title}>상품수정</div>
          <div className={styles.createFormContainer}>
            <div className={styles.idContainer}>
              <div className={styles.heaader}>아이디</div>
              <input
                type="text"
                value={createForm.id}
                onChange={function (e) {
                  const newcreateForm = {
                    ...createForm,
                    id: Number(e.target.value),
                  };
                  setCreateForm(newcreateForm);
                }}
              />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.header}>상품명</div>
              <input
                type="text"
                value={createForm.name}
                onChange={function (e) {
                  const newcreateForm = { ...createForm, name: e.target.value };
                  setCreateForm(newcreateForm);
                }}
              />
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.header}>대표이미지</div>
              <div className={styles.imageList}>
                <ImageList
                  imageFileList={createForm.imageFileList}
                  updateImageList={function (newimageFileList) {
                    const newcreateForm = {
                      ...createForm,
                      imageFileList: newimageFileList,
                    };
                    setCreateForm(newcreateForm);
                  }}
                />
                {createForm.imageFileList.length < 5 && (
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
                      // const imageUrl = URL.createObjectURL(file);
                      const newimageFileList = {
                        ...createForm,
                        imageFileList: [...createForm.imageFileList, file],
                      };
                      setCreateForm(newimageFileList);
                    }}
                  />
                )}
              </div>
            </div>
            <div className={styles.categoryContainer}>
              <div className={styles.header}>카테고리</div>
              <select
                onChange={function (e) {
                  const newcreateForm = {
                    ...createForm,
                    category1Id: Number(e.target.value),
                  };

                  // children depth2
                  // parentId가져온다
                  CategoryRepository.getList({
                    parentId: Number(e.target.value),
                  }).then(function (data) {
                    // state update

                    setDepth2(data);
                  });
                  setCreateForm(newcreateForm);
                }}
              >
                {depth1.map((depthList, i) => {
                  return (
                    <option key={depthList.id} value={depthList.id}>
                      {depthList.name}
                    </option>
                  );
                })}
              </select>
              {`>`}
              <select
                onChange={function (e) {
                  const newcreateForm = {
                    ...createForm,
                    category2Id: Number(e.target.value),
                  };
                  CategoryRepository.getList({
                    parentId: Number(e.target.value),
                  }).then(function (data) {
                    setDepth3(data);
                  });
                  setCreateForm(newcreateForm);
                }}
              >
                {depth2.map((depth, i) => {
                  return (
                    <option key={depth.id} value={depth.id}>
                      {depth.name}
                    </option>
                  );
                })}
              </select>
              {`>`}
              <select
                onChange={function (e) {
                  const newcreateForm = {
                    ...createForm,
                    category3Id: Number(e.target.value),
                  };

                  setCreateForm(newcreateForm);
                }}
              >
                {depth3.map((depth, i) => {
                  return (
                    <option key={depth.id} value={depth.id}>
                      {depth.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.header}>가격</div>
              <input
                type="number"
                value={createForm.price}
                onChange={function (e) {
                  const newcreateForm = {
                    ...createForm,
                    price: Number(e.target.value),
                  };

                  setCreateForm(newcreateForm);
                }}
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
                        checked={createForm.status === statusValue}
                        value={statusValue}
                        onChange={function (e) {
                          const newcreateForm = {
                            ...createForm,
                            status: e.target.value as ProductStatus,
                          };
                          console.log("status", newcreateForm);
                          setCreateForm(newcreateForm);
                        }}
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
                <div
                  onChange={function (e) {
                    const newcreateForm = {
                      ...createForm,
                      createdAt: new Date(),
                    };
                    setCreateForm(newcreateForm);
                  }}
                >
                  hi
                </div>
              </div>
              <div className={styles.updatedDateContainer}>
                <div className={styles.header}>수정일</div>
                <div
                  onChange={function (e) {
                    const newcreateForm = {
                      ...createForm,
                      updatedAt: new Date(),
                    };
                    setCreateForm(newcreateForm);
                  }}
                >
                  bye
                </div>
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
                uploadImageList(createForm.imageFileList).then(function (data) {
                  console.log("data", data);
                });
                //ProductsRepository.create(createForm);
                window.location.href = "/products";
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
