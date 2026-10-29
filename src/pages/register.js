import { FormInput, FormTextarea } from "../components/forms/fields.js";

export default function RegisterPage() {
  return /*HTML*/ `
    <section class="
      relative
      isolate
      grow
      before:content-['']
      before:absolute
      before:inset-0
      before:-z-10
      before:bg-[url('../assets/hero.png')]
      before:bg-no-repeat
      before:bg-bottom-right
      before:bg-size-[auto_50%]
      before:opacity-35
      flex justify-center"
      aria-labelledby="register-heading">
      <div class="w-full max-w-100 h-fit p-8 mx-4 my-0 bg-[var(--surface-color)] rounded-[var(--border-radius)] shadow-[0_4px_8px_var(--shadow-color)] backdrop-blur-[10px] flex flex-col items-center">
        <h1 class="font-bold">pinkripple</h1>
        <p class="my-4">Create an account to join the community.</p>


        <form id="register-form" class="flex flex-col gap-4 w-full">
          ${FormInput({
            labelText: "Name*",
            id: "register-name",
            name: "name",
            type: "text",
            autocomplete: "name",
            placeholder: "my_username",
            isRequired: true,
          })}
          ${FormInput({
            labelText: "Email*",
            id: "register-email",
            name: "email",
            type: "email",
            autocomplete: "email",
            placeholder: "first.last@stud.noroff.no",
            isRequired: true,
          })}
          ${FormInput({
            labelText: "Password*",
            id: "register-password",
            name: "password",
            type: "password",
            autocomplete: "current-password",
            placeholder: "Enter your password",
            isRequired: true,
          })}
          ${FormTextarea({
            labelText: "Bio",
            id: "register-bio",
            name: "bio",
            placeholder: "Tell us about yourself",
          })}
          ${FormInput({
            labelText: "Profile image URL",
            id: "register-avatar-url",
            name: "avatarUrl",
            type: "url",
            placeholder: "https://img.service.com/avatar.jpg",
          })}
          <span class="text-[length:var(--font-size-small)] italic">* Required fields</span>
          <button
            type="submit"
            class="
              tracking-[0.03em]
              font-[family-name:var(--main-font)]
              py-2.5 px-5
              rounded-md
              text-[#131313]
              bg-[var(--color-primary)]
              text-[length:inherit]
              font-semibold
              cursor-pointer
              transition-[background-color,transform]
              duration-150
              ease-[ease]"
            >Register</button>
          <span class="text-[length:var(--font-size-small)] flex flex-col items-center justify-center">
            <div>Already have an account?</div>
            <a
              href="#/login"
              class="inline-block font-medium transition-[color,transform] duration-150 ease-[ease] text-[var(--color-secondary)] dark:text-[var(--color-primary)]"
              >Log in here!</a>
          </span>
          <p
            id="register-message"
            class="text-[length:var(--font-size-small)]"
            role="status"
            aria-live="polite"
          ></p>
        </form>
      </div>
    </section>
  `;
}
