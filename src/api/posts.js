import { apiRequest } from "./client.js";

export async function getPosts(page = 1, limit = 10) {
  return await apiRequest(`/social/posts?limit=${limit}&page=${page}`);
}

export async function getPostById(id) {
  const params = new URLSearchParams({
    _author: "true",
    _comments: "true",
    _reactions: "true",
  });
  return await apiRequest(`/social/posts/${id}?${params}`);
}

export async function searchPosts(query, page = 1, limit = 10) {
  const params = new URLSearchParams({
    q: query,
    limit,
    page,
    _author: "true",
  });

  return await apiRequest(`/social/posts/search?${params}`);
}

// export async function getFollowingPosts(page = 1, limit = 10) {
//   return await apiRequest(
//     `/social/posts/following?limit=${limit}&page=${page}`,
//   );
// }

export async function getPostsByProfile(name, page = 1, limit = 10) {
  return await apiRequest(
    `/social/profiles/${name}/posts?limit=${limit}&page=${page}`,
  );
}

export async function createNewPost(postData) {
  return await apiRequest("/social/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export async function deletePost(id) {
  return await apiRequest(`/social/posts/${id}`, {
    method: "DELETE",
  });
}

export async function updatePost(id, postData) {
  return await apiRequest(`/social/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
}
