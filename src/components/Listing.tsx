import React, { useEffect, useState } from "react";
import Autoenhance from "@autoenhance.ai/javascript";
import { ImageOut, OrderOut } from "@autoenhance.ai/javascript/dist/models";
import { Loading } from "./Loading";

interface ListingProps {
    orderId: string;
    autoenhance: Autoenhance;
    onProcessed?: () => void;
}

export const Listing: React.FC<ListingProps> = ({
    orderId,
    autoenhance,
    onProcessed,
}) => {
    const [order, setOrder] = useState<OrderOut | null>(null);
    const [orderImages, setOrderImages] = useState<ImageOut[] | null>(null);
    const [shouldReload, setShouldReload] = useState(true);
    const [allImages, setAllImages] = useState<string[] | null>(null);

    const getOrder = async () => {
        try {
            const order = await autoenhance.OrdersApi.retrieveOrder({
                id: orderId,
            });
            if (!order || order.status !== "processed") {
                setShouldReload(true);
            } else {
                setShouldReload(false);
                setOrder(order);
                setOrderImages(order.images || []);
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            setShouldReload(true);
        }
    };

    useEffect(() => {
        getOrder();

        if (shouldReload) {
            const interval = setInterval(() => {
                getOrder();
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [shouldReload]);

    useEffect(() => {
        const getImageUrl = async () => {
            if (orderImages) {
                const imagesArr: string[] = [];
                for (const image of orderImages) {
                    const blob =
                        await autoenhance.ImagesApi.downloadEnhancedImage({
                            id: image.imageId || "",
                            preview: true,
                        });
                    const url = URL.createObjectURL(blob);

                    imagesArr.push(url);
                }
                setAllImages(imagesArr);
                onProcessed && onProcessed();
            }
        };
        getImageUrl();
    }, [orderImages]);

    if (!order || !allImages || order.status !== "processed") {
        return (
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-lg font-bold mb-4'>
                    Waiting for images to be processed...
                </h1>
                <Loading />
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <p className='text-lg mb-4'>Order ID: {orderId}</p>
            <div className='grid grid-cols-2 gap-4'>
                {allImages.map((image, index) => (
                    <img key={index} src={image} alt='Listing Image' />
                ))}
            </div>
        </div>
    );
};
