export function FollowButton({ following = false } = {}) {
  const buttonText = following ? "Unfollow" : "Follow";

  return /*HTML*/ `
    <button
      id="follow-button"
      type="button"
      class="alternative-button"
      aria-pressed="${following}"
    >
      ${buttonText}
    </button>
  `;
}
