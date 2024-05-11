## SpellBook Web App

### Run locally

-   Install the dependencies with: `pnpm i`
-   Run the project locally with: `pnpm run dev`
-   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test on mobile devices

With the project running locally, you can use [ngrok](https://ngrok.com/download) to expose your local server to the internet. This way you can test the website on mobile devices:

-   Open a local server with `ngrok http 3000`
-   Copy the URL that ngrok gives you and paste it in the browser of your mobile device

## Database

Generate migrations: 'pnpm run db:generate'
Migrate: 'pnpm run db:migrate'
View data: 'pnpm run db:studio'
