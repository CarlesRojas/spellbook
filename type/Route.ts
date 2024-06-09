export enum Route {
    SPELLS = "/",
    SPELL = "/spell",
    MY_SPELLS = "/my-spells",
    CHARACTERS = "/characters",
    CHARACTER = "/character",
}

export const DYNAMIC_ROUTES: Route[] = [Route.SPELL, Route.CHARACTERS, Route.CHARACTER, Route.MY_SPELLS];
