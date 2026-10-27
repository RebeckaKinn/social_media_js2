import { FormInput } from "../components/forms/fields.js";

export default function LoginPage() {
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
      >
      <div class="w-full max-w-100 h-fit p-8 mx-4 my-0 bg-[var(--surface-color)] rounded-[var(--border-radius)] shadow-[0_4px_8px_var(--shadow-color)] backdrop-blur-[10px] flex flex-col items-center">
        <h1 class="font-bold">pinkripple</h1>
        <p class="my-4">Log in to view and share posts.</p>

        <form id="login-form" class="flex flex-col gap-4 w-full">
          ${FormInput({
            labelText: "Email",
            id: "login-email",
            name: "email",
            type: "email",
            autocomplete: "email",
            placeholder: "first.last@stud.noroff.no",
            isRequired: true,
          })}
          ${FormInput({
            labelText: "Password",
            id: "login-password",
            name: "password",
            type: "password",
            autocomplete: "current-password",
            placeholder: "Enter your password",
            isRequired: true,
          })}

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
            >Log in</button>
          <span class="text-[length:var(--font-size-small)] flex flex-col items-center justify-center">
            <div>Don't have an account?</div>
            <a href="#/register">Register here!</a>
          </span>
          <p
            id="login-message"
            class="text-[length:var(--font-size-small)]"
            role="status"
            aria-live="polite"
          ></p>
        </form>
      </div>
    </section>
  `;
}
