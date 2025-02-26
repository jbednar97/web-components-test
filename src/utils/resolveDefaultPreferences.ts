import { Preferences } from "../types/preferences";
import { defaultPreferences } from "./preferences/default";

export const resolveDefaultPreferences = (
    imageType: string,
    preferences: Preferences | null
) => {
    const preferencesToUse = preferences ? preferences : defaultPreferences;
    const additionalObject = {
        hdr: false,
        single_bracket: false,
        threesixty: false,
    };

    switch (imageType) {
        case "hdr":
            additionalObject.hdr = true;
            additionalObject.single_bracket = false;
            additionalObject.threesixty = false;
            break;
        case "threesixty":
            additionalObject.threesixty = true;
            additionalObject.single_bracket = false;
            additionalObject.hdr = false;
            break;
        case "single-bracket":
            additionalObject.single_bracket = true;
            additionalObject.hdr = false;
            additionalObject.threesixty = false;
            break;
    }
    if (!preferencesToUse.cloud_type) {
        preferencesToUse.sky_replacement = false;
    }
    return {
        ...preferencesToUse,
        ...additionalObject,
    };
};
