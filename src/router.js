import FeedPage from "./pages/feed.js";
import LoginPage from "./pages/login.js";
import PostPage from "./pages/post.js";
import ProfilePage from "./pages/profile.js";
import RegisterPage from "./pages/register.js";
import Fallback from "./pages/fallback.js";
import { isAuthenticated } from "./api/auth.js";
import { hasApiConfig } from "./api/client.js";

const routes = [
  { pattern: /^\/$/, render: FeedPage, public: false },
  { pattern: /^\/profile$/, render: ProfilePage, public: false },
  { pattern: /^\/login$/, render: LoginPage, public: true },
  { pattern: /^\/register$/, render: RegisterPage, public: true },
  {
    pattern: /^\/post\/([^/]+)$/,
    render: ([, id]) => PostPage({ id: decodeURIComponent(id) }),
    public: false,
  },
];

function getPath() {
  const path = window.location.hash.slice(1) || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function renderRoute() {
  const path = getPath();
  const route = routes.find(({ pattern }) => pattern.test(path));

  if (!hasApiConfig()) {
    return {
      content: Fallback({
        title: "Something went wrong",
        message: "Missing API information.",
      }),
      showShell: false,
    };
  }

  if ((!route || !route.public) && !isAuthenticated()) {
    if (path !== "/login") {
      window.location.hash = "#/login";
    }

    return {
      content: LoginPage(),
      showShell: false,
    };
  }

  if (route) {
    const match = path.match(route.pattern);
    return {
      content: route.render(match),
      showShell: !route.public,
    };
  }

  return {
    content: Fallback({
      title: "Page not found",
      message: "The page you are looking for does not exist.",
    }),
    showShell: true,
  };
}

export function startRouter(onRouteChange) {
  window.addEventListener("hashchange", onRouteChange);
  onRouteChange();
}
