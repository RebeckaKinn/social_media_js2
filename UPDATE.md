
1. Adding tailwind cli
2. Adding scripts in package.json
3. Adding import in base.css
4. Creating output.css for the generated styles
5. Put `npx @tailwindcss/cli -i ./src/styles/base.css -o ./src/styles/output.css --watch` in terminal
6. Since `vite` uses the "dev" and "build" scripts, I added two new scripts. The "build" has "&&" since it runs the next call after the other one is finished. The "dev" cannot do this since the "watch" is continuously and will result in "vite" not running.


### Tips I learned by doing


By using `[]` with the tailwind classes, I can specify my own values or variables.


### Pages to update using tailwind


1. DONE - login.js - form and HTML-valitadion (required)
2. DONE - fields.js
3. register.js
4. main.js or feed.js


### Things to remember


1. Remember to add in readme.md the updates
2. Add in readme.md that you have to install the dependency of tailwind as well `npm install tailwindcss @tailwindcss/cli`
