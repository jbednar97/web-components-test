import { ImageOut } from "@autoenhance.ai/javascript/dist/models";
import { ImageIn } from "@autoenhance.ai/javascript/src/models/ImageIn";

export type ImageType = "single-bracket" | "hdr" | "threesixty";
export type AutoenhanceImageIn = ImageIn;

export type ImageToUse = "original" | "enhanced" | "watermark";
export interface ExtendedImageOut extends ImageOut {
    imageToUse?: ImageToUse;
}

export type ImageSizeType = "watermark" | "optimized" | "full-resolution";
