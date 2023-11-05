import { supabase } from "../index";

import {
  NewProductParam,
  Product,
  ProductResponse,
  UpdateProductParam,
} from "@/repositories/products/types";

// superbase 테이블 title 이름이다
const SCHEMA_NAME = "PRODUCTS";

export const mapResponse = (item: ProductResponse): Product => {
  return {
    ...item,
  };
};
// getList의 type은 Promise이고 resovle되는 type은 Product[]다
export function getList(): Promise<Product[]> {
  const query = supabase.from(SCHEMA_NAME).select();
  return new Promise(function (resolve) {
    query.returns<ProductResponse[]>().then(function ({ data }) {
      if (!data) {
        resolve([]);
        return;
      }
      resolve(data);
    });
  });
}

export function getById(id: number): Promise<Product[]> {
  console.log("id :", id);
  return new Promise(function (resolve) {
    const query = supabase
      .from(SCHEMA_NAME)
      .select()
      .eq("id", id)
      .returns<ProductResponse[]>();
    query.returns<ProductResponse[]>().then(function ({ data }) {
      console.log("data :", data);
      if (!data) {
        resolve([]);
        return;
      }

      resolve(data);
    });
  });
}

export function create(product: NewProductParam): Promise<void> {
  return new Promise(function (resolve) {
    console.log(product, "hello");
    supabase
      .from(SCHEMA_NAME)
      .insert(product)
      .throwOnError()
      .then(function () {
        resolve();
      });
  }).catch(function (error) {
    if (error.code === "23505") {
      throw Error("중복된 값이 있습니다");
    }

    throw error;
  });
}

export function update(product: UpdateProductParam): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .update(product)
      .eq("id", product.id)
      .throwOnError()
      .then(function () {
        resolve();
      });
  });
}

export function deleete(id: number): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .delete()
      .eq("id", id)
      .throwOnError()
      .then(function () {
        resolve();
      });
  });
}
