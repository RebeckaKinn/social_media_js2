import { GeneralPlaceholder } from "../placeholder.js";

export function ProfileBio(text = "") {
  return /*HTML*/ `
    <div class="bio-container small-txt">
      <p>${text}</p>
    </div>
  `;
}

export function ProfileInformation({
  followers = 0,
  following = 0,
  posts = 0,
}) {
  return /*HTML*/ `
    <div class="profile-stats-container flex space-evenly">
      ${ProfileStats(followers, "followers")}
      <span>|</span>
      ${ProfileStats(following, "following")}
      <span>|</span>
      ${ProfileStats(posts, "posts")}
    </div>
  `;
}

function ProfileStats(number, text) {
  return /*HTML*/ `
      <div class="profile-stats flex column center">
        <b>${number}</b>
        <p class="small-txt">${text}</p>
      </div>
  `;
}

/*
{
  x name: "rebecka_test",
  email: "rebecka_testing_05@stud.noroff.no",
  x bio: "",
  x avatar: {
    url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
    alt: "A blurry multi-colored rainbow background",
  },
  x banner: {
    url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
    alt: "A blurry multi-colored rainbow background",
  },
  _count: {
    followers: 0,
    following: 0,
    posts: 0,
  },
*/
