export const CategoryImportanceLevel = {
  1: "Irrelevante",
  2: "Normal",
  3: "Importante",
};

export type CategoryImportanceLevelKey = keyof typeof CategoryImportanceLevel;

export const getCategoryImportanceLevel = (type: CategoryImportanceLevelKey) =>
  CategoryImportanceLevel[type];
