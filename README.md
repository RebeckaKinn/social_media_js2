# PinkRipple

PinkRipple is a social media application built with JavaScript and the Noroff API. Users can register, log in, browse and search posts, manage their own posts, view profiles, and follow or unfollow other users.

## Languages and technologies

- JavaScript Module
- CSS
- HTML
- Node

No frameworks or libraries were used due to spesified requirements.

### Required pages

- Login page
- Register page
- Individal Post page
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

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to a new file named `.env.local`.

5. Add the API URL and your Noroff API key to `.env.local`:

   ```env
   VITE_API_URL=https://v2.api.noroff.dev
   VITE_API_KEY=your-noroff-api-key
   ```

6. Start the Vite development server:

   ```bash
   npm run dev
   ```

Open the local URL displayed in the terminal, normally `http://localhost:5173/`.
