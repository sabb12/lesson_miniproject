/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  imageFileList: File[];
  updateImageList: (newImageFileList: File[]) => void;
};

export default function ImageList(props: Props) {
  const { imageFileList, updateImageList } = props;

  let startIndex, overLayIndex;
  //
  console.log(imageFileList, "asdasd");

  return (
    <>
      {imageFileList?.map(function (imageUrl, i) {
        return (
          <div key={i} style={{ width: 100, height: 100 }}>
            <div
              onClick={function (e) {
                const newImageUrlList = [...imageFileList].filter(
                  (image) => image !== imageUrl
                );
                updateImageList(newImageUrlList);
              }}
            >
              &times;
            </div>
            <img
              onDragStart={function () {
                startIndex = i;
                console.log("startIndex :", i);
              }}
              onDragOver={function () {
                overLayIndex = i;
                console.log("overLayIndex :", i);
              }}
              onDragEnd={function () {
                const newImageUrList = [...imageFileList];
                if (startIndex == null || overLayIndex == null) return;
                const temp = newImageUrList[startIndex];
                newImageUrList[startIndex] = newImageUrList[overLayIndex];
                newImageUrList[overLayIndex] = temp;
                console.log("newImageUrList :", newImageUrList);
                updateImageList(newImageUrList);
              }}
              // 미리보기 때는 URL.
              src={URL.createObjectURL(imageUrl)}
              alt=""
              style={{
                width: 100,
                height: 100,
                border: "1px solid red",
              }}
            />
            <input
              type="file"
              onChange={function (e) {
                if (!e.target.files) {
                  alert("파일이 없다");
                  return;
                }
                const file = e.target.files[0];
                // console.log("file", file);
                // const imageUrl = URL.createObjectURL(file);
                const newImageFileList = [...imageFileList];
                newImageFileList[i] = file;
                updateImageList(newImageFileList);
              }}
            />
          </div>
        );
      })}
    </>
  );
}
// let imagePosition = []
// index 2를 클릭 하고 0번 째 index로 drop 했을 때 ["a","b","c"] => ["c","b","a"]
// const temp = list[2]
// list[2] = list[0] = ["a","b","a"]
// list[0] = temp = ["c","b","a"]
// index 2를 클릭 하고 1번 째 index로 drop 했을 때 ["c","b","a"] => ["c","a","b"]
// list[2] = list[0]
// index 0를 클릭 하고 2번 째 index로 drop 했을 때 ["c","a","b"] => ["b","a","c"]

// let startIndex, overLayIndex;
// startIndex = 0
// overLay = 2
// const newImageUrList = [...imageFileList];

// const temp = newImageUrList[startIndex];
//                                 0
// newImageUrList[startIndex] = newImageUrList[overLayIndex];
//
// newImageUrList[overLayIndex] = temp;
