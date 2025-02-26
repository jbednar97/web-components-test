import React, { FC, useEffect, useMemo, useState } from "react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { v4 as uuidv4 } from "uuid";
import { Dashboard } from "@uppy/react";
import { Uppy as UppyComponent } from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { getPreSignedURL } from "../utils/getPreSignedURL";
import Autoenhance from "@autoenhance.ai/javascript";
import { Listing } from "./Listing";

interface ImageUploaderProps {
    onProcessed?: () => void;
}

export const ImageUploader: FC<ImageUploaderProps> = ({ onProcessed }) => {
    const [view, setView] = useState<"upload" | "listing">("upload");
    const [usedOrderId, setUsedOrderId] = useState<string | null>(null);

    const autoenhance = new Autoenhance(
        "Gb0EwCpy8RfOu7VYbABe46gGDOlIQ7x8JKaRhRrj",
        {
            baseURL: "https://dev.api.autoenhance.ai",
        }
    );
    const orderId = uuidv4();
    const uppy = useMemo(() => {
        return new UppyComponent({
            id: "uppy-homepage",
            restrictions: {
                maxFileSize: 200 * 1024 * 1024,
                maxNumberOfFiles: 15,
                allowedFileTypes: [
                    ".jpeg",
                    ".jpg",
                    ".dng",
                    ".cr2",
                    ".crw",
                    ".nrw",
                    ".nef",
                    ".arw",
                    ".srf",
                    ".sr2",
                    ".cr3",
                    ".raf",
                    ".tif",
                    ".tiff",
                    ".heic",
                    ".avif",
                    ".rwl",
                    ".rw2",
                    ".webp",
                ],
            },
        })

            .use(AwsS3, {
                id: "AwsS3",
                limit: 4,
                shouldUseMultipart: false,
                getUploadParameters: async (file: any) => {
                    const URL = await getPreSignedURL(
                        file,
                        orderId,
                        autoenhance,
                        "single-bracket",
                        null
                    );
                    return {
                        method: "PUT",
                        url: URL.url,
                        headers: {
                            "Content-Type":
                                URL.fileType || "application/octet-stream",
                        },
                    };
                },
            })
            .on("files-added", (files) => {
                files.map((file) => {
                    if (file.extension.includes("dng")) {
                        uppy.info(
                            {
                                message:
                                    "DNG files might have issues with purple colour cast. Please visit our article listed down bellow in order to better understand the issue.",
                                details: "",
                            },
                            "warning",
                            5000
                        );
                    }
                });
            })

            .on("complete", async () => {
                setUsedOrderId(orderId);
                setView("listing");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resolveComponent = () => {
        switch (view) {
            case "upload":
                return (
                    <div className='flex flex-col max-w-full '>
                        <Dashboard
                            id='dashboard'
                            uppy={uppy}
                            className='max-w-full'
                        />
                        <p className='text-sm opacity-50 w-full text-center mt-2'>
                            Upload images for your listing.
                        </p>
                    </div>
                );
            case "listing":
                return (
                    <Listing
                        orderId={usedOrderId || ""}
                        autoenhance={autoenhance}
                        onProcessed={onProcessed}
                    />
                );
        }
    };

    return (
        <>
            <input
                type='hidden'
                name='orderId'
                id='orderId'
                value={usedOrderId || ""}
            />
            {resolveComponent()}
        </>
    );
};
