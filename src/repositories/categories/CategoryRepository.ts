import { supabase } from "../index";

import {
  GetListParam,
  Category,
  CategoryResponse,
  NewCategoryParam,
  UpdateCategoryParam,
} from "@/repositories/categories/types";

const SCHEMA_NAME = "categories";

export const mapResponse = (item: CategoryResponse): Category => {
  return {
    ...item,
  };
};

export function getList({
  depth,
  parentId,
}: GetListParam): Promise<Category[]> {
  return new Promise(function (resolve) {
    let query = supabase.from(SCHEMA_NAME).select();

    if (depth) {
      query = query.eq("depth", depth);
    }

    if (parentId) {
      query = query.eq("parentId", parentId);
    }

    query.returns<CategoryResponse[]>().then(function ({ data }) {
      if (!data) {
        resolve([]);
        return;
      }

      resolve(data.map(mapResponse));
    });
  });
}

export function create(category: NewCategoryParam): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .insert(category)
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

export function update(updateCategory: UpdateCategoryParam): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .update(updateCategory)
      .eq("id", updateCategory.id)
      .throwOnError()
      .then(function () {
        resolve();
      });
  });
}

// delete
export function deleteById(id: number): Promise<void> {
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

export function deleteByParentId(parentId: number): Promise<void> {
  return new Promise(function (resolve) {
    supabase
      .from(SCHEMA_NAME)
      .delete()
      .eq("parentId", parentId)
      .throwOnError()
      .then(function () {
        resolve();
      });
  });
}
