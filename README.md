# PinkRipple

PinkRipple is a social media application built with JavaScript and the Noroff API. Users can register, log in, browse and search posts, manage their own posts, view profiles, and follow or unfollow other users.

## Languages and technologies

- JavaScript Module
- CSS
- Tailwind CSS v4 (installed through npm)
- HTML
- Node

The application uses vanilla JavaScript, with Vite as the development server and build tool. Tailwind CSS is used for styling as part of the CSS Frameworks assignment.

## CSS Frameworks assignment

The framework styling work is on the `css-frameworks` branch, branched from the original JS2 CA work on `main`.

The following three pages have been styled with Tailwind:

- Login (`src/pages/login.js`)
- Registration (`src/pages/register.js`)
- Feed (`src/pages/feed.js`)

Shared components, including form fields and post cards, also use Tailwind utilities. Other parts of the application retain their existing CSS.

Tailwind and its CLI are installed through the `tailwindcss` and `@tailwindcss/cli` npm packages. No CDN is used for Tailwind. Running `npm install` installs both packages along with the other project dependencies.

The CSS entry point is `src/styles/base.css`, which imports Tailwind and the project's custom styles. The Tailwind CLI generates `src/styles/output.css`, which is imported by `src/main.js`. Make style changes in the source files rather than editing the generated output.

### Required pages

- Login page
- Register page
- Individual post page
- Feed page
- User's own profile page

The individual post page is made into a modal / overlay instead of a standalone page. This is because I think it is easier for a user to get access to a post, as well as easy access back to the original page. In the future, I would like to either add a "share" button on each post, or add the post-information in the URL to make it easily shared between users. 


## Live application

[https://pinkripple.netlify.app/](https://pinkripple.netlify.app/)

## Requirements

- [Node.js](https://nodejs.org/) and npm
- A Noroff API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RebeckaKinn/social_media_js2.git
   ```

2. Move into the project directory:

   ```bash
   cd social_media_js2
   ```

3. Switch to the assignment branch and install the dependencies:

   ```bash
   git switch css-frameworks
   npm install
   ```

4. Copy `.env.example` to a new file named `.env.local`.

5. Add the API URL and your Noroff API key to `.env.local`:

   ```env
   VITE_API_URL=https://v2.api.noroff.dev
   VITE_API_KEY=your-noroff-api-key
   ```

## Development

Run these commands in two separate terminals from the project directory. Keep both running while developing.

In the first terminal, start the Tailwind watcher:

```bash
npm run tailwind:watch
```

This script includes the `--watch` flag. It compiles the CSS and regenerates `src/styles/output.css` when relevant source files change.

In the second terminal, start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, normally `http://localhost:5173/`.

`npm run dev` starts Vite only, so the Tailwind watcher must run alongside it to keep the generated styles up to date. The commands run separately because a watcher keeps running; joining them with `&&` would prevent the second command from starting until the watcher stops.

## Production build and local preview

Create a production build:

```bash
npm run build
```

This first runs `tailwind:build` to generate minified CSS, then runs `vite build` to create the production files in `dist`. The watcher does not need to be running for this command.

To inspect the completed build locally:

```bash
npm run preview
```

Open the URL shown in the terminal. Preview serves the existing production build; run `npm run build` again after making changes you want to preview.
