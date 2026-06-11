export default function PostPage({ id } = {}) {
  return /*html*/ `
    <h1>Post</h1>
    <p>Viewing post ${id ?? ""}.</p>
  `;
}
