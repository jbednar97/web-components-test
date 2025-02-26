import Autoenhance from "@autoenhance.ai/javascript";
import { Preferences } from "../types/preferences";
import { ImageType } from "../types/imageType";
import { resolveDefaultPreferences } from "./resolveDefaultPreferences";
import { convertToCamelCase } from "./preferences/convertToCamelCase";

export async function getPreSignedURL(
    file: any,
    orderId: string,
    autoenhance: Autoenhance,
    imageType: ImageType,
    preferences: Preferences | null
) {
    let fileType;
    if (file.type !== "" && file.type !== "application/octet-stream") {
        fileType = file.type;
    } else {
        fileType = `image/${file.name
            .split(".")
            [file.name.split(".").length - 1].toLowerCase()}`;
    }

    const preferencesToUse = resolveDefaultPreferences(imageType, preferences);
    const camelCasePreferences = convertToCamelCase(
        preferencesToUse as Preferences
    );
    const body = {
        orderId: orderId,
        imageName: file.name,
        contentType: fileType,
    };
    const { s3PutObjectUrl } = await autoenhance.ImagesApi.createImage({
        imageIn: {
            ...body,
            ...camelCasePreferences,
        },
    });
    if (!s3PutObjectUrl) {
        console.error("Error getting presigned URL");
    }
    try {
        await fetch(s3PutObjectUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: file.data,
        });
    } catch (e) {
        console.error(e, "Error fetching s3PutObjectUrl");
    }
    return {
        url: s3PutObjectUrl,
        fileType,
    };
}
