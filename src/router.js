import FeedPage from "./pages/feed.js";
import LoginPage from "./pages/login.js";
import PostPage from "./pages/post.js";
import ProfilePage from "./pages/profile.js";
import RegisterPage from "./pages/register.js";
import Fallback from "./pages/fallback.js";

const routes = [
  { pattern: /^\/$/, render: FeedPage },
  { pattern: /^\/profile$/, render: ProfilePage },
  { pattern: /^\/login$/, render: LoginPage },
  { pattern: /^\/register$/, render: RegisterPage },
  {
    pattern: /^\/post\/([^/]+)$/,
    render: ([, id]) => PostPage({ id: decodeURIComponent(id) }),
  },
];

function getPath() {
  const path = window.location.hash.slice(1) || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function renderRoute() {
  const path = getPath();
  const route = routes.find(({ pattern }) => pattern.test(path));

  if (route) {
    const match = path.match(route.pattern);
    return route.render(match);
  }

  return Fallback();
}

export function startRouter(onRouteChange) {
  window.addEventListener("hashchange", onRouteChange);
  onRouteChange();
}
