export enum Route {
    SPELLS = "/",
    SPELL = "/spell",
    CHARACTERS = "/characters",
    CHARACTER = "/character",
}

export const DYNAMIC_ROUTES: Route[] = [Route.SPELL, Route.CHARACTERS, Route.CHARACTER];
