export type CategoryResponse = {
  id: number;
  name: string;
  depth: number;
  parentId: number;
};

// 새로 추가 하는 category는 id 추가 할 필요 없다, 서버에서 만들어 준다
export type NewCategoryParam = Omit<CategoryResponse, "id">;
export type UpdateCategoryParam = { id: number; name: string };

export type GetListParam = {
  depth?: number;
  parentId?: number;
};

export type Category = CategoryResponse;
