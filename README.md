## SpellBook Web App

### Run locally

-   Install the dependencies with: `pnpm i`
-   Run the project locally with: `pnpm dev`
-   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test on mobile devices

With the project running locally, you can use [ngrok](https://ngrok.com/download) to expose your local server to the internet. This way you can test the website on mobile devices:

-   Open a local server with `ngrok http 3000`
-   Copy the URL that ngrok gives you and paste it in the browser of your mobile device

## Database

Generate migrations: 'pnpm db:generate'
Migrate: 'pnpm db:migrate'
View data: 'pnpm db:studio'

## TODO

-   [ ] Fix icon for Compulsion

-   [ ] Share custom spells
-   [ ] Custom attack modifiers and spell DCs
-   [ ] Change the amount of spells per level
-   [ ] Add spells that don't count towards the max spells limit.

-   [ ] Add all spell casting classes (Artificer, Rogue...)
-   [ ] Custom classes?
-   [ ] Show the class of each subclass? (e.g. "Lore (Bard)")
-   [ ] Look into eldritch subclass to add other classes
-   [ ] Add links section to spells?
-   [ ] Innate spells? (Ones that you can cast once a day for free)
-   [ ] DM tab to manage bad guy spells and legendary actions/resistances
