type Level = "LOW" | "MEDIUM" | "HIGH" | null;

export type AiVersion = "4.3" | "4.4" | "4.5" | "4.x" | "dev";
export type EnhanceType =
    | "property"
    | "property_usa"
    | "warm"
    | "neutral"
    | "authentic"
    | null;
export type CloudType = "CLEAR" | "LOW_CLOUD" | "HIGH_CLOUD" | null;
export type VerticalCorrection = boolean;
export type AutoPrivacy = boolean;
export type LensCorrection = boolean;
export type WindowPull = boolean;
export type ContrastBoost = Level;
export type BrightnessBoost = Level;
export type SaturationLevel = Level;
export type SharpenLevel = Level;
export type DenoiseLevel = Level;
export type ClarityLevel = Level;

export type Preferences = {
    ai_version: AiVersion;
    enhance_type: EnhanceType;
    sky_replacement: boolean;
    cloud_type: CloudType;
    vertical_correction: VerticalCorrection;
    privacy: AutoPrivacy;
    lens_correction: LensCorrection;
    window_pull: WindowPull;
    contrast_boost: ContrastBoost;
    brightness_boost: BrightnessBoost;
    saturation_level: SaturationLevel;
    sharpen_level: SharpenLevel;
    denoise_level: DenoiseLevel;
    clarity_level: ClarityLevel;
};

export type CamelCasePreferences = {
    aiVersion: AiVersion;
    enhanceType: EnhanceType;
    skyReplacement: boolean;
    cloudType: CloudType;
    verticalCorrection: VerticalCorrection;
    privacy: AutoPrivacy;
    lensCorrection: LensCorrection;
    windowPull: WindowPull;
    contrastBoost: ContrastBoost;
    brightnessBoost: BrightnessBoost;
    saturationLevel: SaturationLevel;
    sharpenLevel: SharpenLevel;
    denoiseLevel: DenoiseLevel;
    clarityLevel: ClarityLevel;
};
