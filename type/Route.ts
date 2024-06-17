export enum Route {
    SPELLS = "/",
    SPELL = "/spell",
    MY_SPELLS = "/my-spells",
    CHARACTERS = "/characters",
    CHARACTER = "/character",

    PRIVACY_POLICY = "/legal/privacy-policy",
    TERMS_OF_USE = "/legal/terms-and-conditions",
}

export const DYNAMIC_ROUTES: Route[] = [Route.SPELL, Route.CHARACTER];
