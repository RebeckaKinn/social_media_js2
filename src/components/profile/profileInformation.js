import { GeneralPlaceholder } from "../placeholder.js";

export function ProfileBio(bio) {
  if (bio === null || bio === undefined || bio === "") {
    bio = "No bio available.";
  }
  return /*HTML*/ `
    <div class="bio-container small-txt">
      <p>${bio}</p>
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
