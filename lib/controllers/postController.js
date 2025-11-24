import Post from "@/models/Post";

export async function listPosts() {
  return await Post.find().populate("doctor categories").lean();
}

export async function createPost(data) {
  return await Post.create(data);
}

export async function getPost(id) {
  return await Post.findById(id).populate("doctor categories").lean();
}

export async function updatePost(id, data) {
  return await Post.findByIdAndUpdate(id, data, { new: true })
    .populate("doctor categories")
    .lean();
}

export async function deletePost(id) {
  return await Post.findByIdAndDelete(id).lean();
}
