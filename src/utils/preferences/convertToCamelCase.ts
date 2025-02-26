import { CamelCasePreferences, Preferences } from "../../types/preferences";

const toCamelCase = (str: string): string => {
    return str
        .replace(/([-_ ]+[a-z])/gi, ($1) => {
            return $1
                .toUpperCase()
                .replace("-", "")
                .replace("_", "")
                .replace(" ", "");
        })
        .replace(/^[A-Z]/, (match) => match.toLowerCase());
};

export const convertToCamelCase = (preferences: Preferences): Preferences => {
    const result: CamelCasePreferences & Preferences =
        {} as CamelCasePreferences & Preferences;
    Object.keys(preferences).forEach((key) => {
        const camelCaseKey = toCamelCase(key) as keyof CamelCasePreferences;
        result[camelCaseKey] = preferences[key as keyof Preferences] as never;
    });
    return result;
};
