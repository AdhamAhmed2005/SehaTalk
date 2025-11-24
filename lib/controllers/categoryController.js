import Category from "@/models/Category";

export async function listCategories() {
  return await Category.find().lean();
}

export async function createCategory(data) {
  return await Category.create(data);
}

export async function getCategory(id) {
  return await Category.findById(id).lean();
}

export async function updateCategory(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteCategory(id) {
  return await Category.findByIdAndDelete(id).lean();
}
