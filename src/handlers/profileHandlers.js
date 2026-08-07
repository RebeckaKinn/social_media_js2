import { getPostsByProfile } from "../api/posts.js";
import {
  followProfile,
  getProfileByName,
  getLoggedInProfile,
  unfollowProfile,
} from "../api/profiles.js";
import { setupPostFeed } from "./postFeedHandlers.js";
import { setupNewPostButton } from "./postHandlers.js";
import { ProfileBanner } from "../components/profile/profileHeaders.js";
import {
  ProfileBio,
  ProfileInformation,
} from "../components/profile/profileInformation.js";
import { showModal } from "../components/modal.js";
import { EditProfile } from "../components/profile/profileEdit.js";
import { NewPostButton } from "../components/NewPostButton.js";

const POSTS_PER_PAGE = 4;

export async function setupProfilePage() {
  const banner = document.querySelector("#profile-banner");
  const bio = document.querySelector("#profile-bio");
  const info = document.querySelector("#profile-info");

  if (!banner) return;
  const [user, loggedInProfile] = await Promise.all([
    getProfileForCurrentRoute(),
    getLoggedInProfile(),
  ]);

  const isOwnProfile = user.name === loggedInProfile.name;

  const isFollowing =
    !isOwnProfile &&
    loggedInProfile.following?.some((profile) => profile.name === user.name);

  banner.innerHTML = ProfileBanner({
    name: user.name,
    avatar: user.avatar,
    banner: user.banner,
    isOwnProfile,
    isFollowing,
  });
  bio.innerHTML = ProfileBio(user.bio);
  info.innerHTML = ProfileInformation({
    followers: user._count.followers,
    following: user._count.following,
    posts: user._count.posts,
  });

  if (!isOwnProfile) {
    connectFollowButton({
      viewedProfile: user,
      initialIsFollowing: isFollowing,
      infoContainer: info,
    });
  }

  if (isOwnProfile) {
    const newPostContainer = document.querySelector("#new-post");

    if (newPostContainer) {
      newPostContainer.innerHTML = NewPostButton();
      setupNewPostButton();
    }
  }

  setupPostFeed({
    containerSelector: "#profile-post-feed",
    loadMoreButtonSelector: "#load-more-posts-btn",
    postsPerPage: POSTS_PER_PAGE,
    loadPosts: async (page, limit) => {
      const result = await getPostsByProfile(user.name, page, limit);
      return result.data;
    },
    fallbackTitle: "Could not load profile posts",
    showDeleteButton: isOwnProfile,
  });
  connectProfileEdits(isOwnProfile);
}

function getProfileNameFromRoute() {
  const path = window.location.hash.slice(1) || "/profile";
  const match = path.match(/^\/profile\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function getProfileForCurrentRoute() {
  const profileName = getProfileNameFromRoute();

  if (!profileName) {
    return await getLoggedInProfile();
  }

  const result = await getProfileByName(profileName);
  return result.data;
}

function connectProfileEdits(isOwnProfile) {
  if (!isOwnProfile) return;
  const profileEdit = document.querySelector("#profile-edit");
  // profileEdit.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   const popUp = EditProfile();
  //   showModal(popUp);
  //   // imagePreviewHandler();
  // });
}

function connectFollowButton({
  viewedProfile,
  initialIsFollowing,
  infoContainer,
}) {
  const followButton = document.querySelector("#follow-button");

  if (!followButton) return;

  let currentlyFollowing = initialIsFollowing;

  followButton.addEventListener("click", async () => {
    followButton.disabled = true;

    followButton.textContent = currentlyFollowing
      ? "Unfollowing..."
      : "Following...";

    try {
      const result = currentlyFollowing
        ? await unfollowProfile(viewedProfile.name)
        : await followProfile(viewedProfile.name);

      currentlyFollowing = !currentlyFollowing;

      followButton.textContent = currentlyFollowing ? "Unfollow" : "Follow";

      followButton.setAttribute("aria-pressed", String(currentlyFollowing));

      const returnedFollowerCount = result.data.followers?.length;

      viewedProfile._count.followers =
        returnedFollowerCount ??
        Math.max(
          0,
          viewedProfile._count.followers + (currentlyFollowing ? 1 : -1),
        );

      infoContainer.innerHTML = ProfileInformation({
        followers: viewedProfile._count.followers,
        following: viewedProfile._count.following,
        posts: viewedProfile._count.posts,
      });
    } catch (error) {
      followButton.textContent = currentlyFollowing ? "Unfollow" : "Follow";

      console.error("Could not update follow status:", error);
    } finally {
      followButton.disabled = false;
    }
  });
}
