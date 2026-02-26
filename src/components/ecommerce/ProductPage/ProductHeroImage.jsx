"use client";

import React from "react";

/**
 * ProductHeroImage Component
 * 
 * Large lifestyle/hero image section for visual impact.
 * Displays a full-width premium product photography.
 */
export default function ProductHeroImage({
    src,
    alt = "Product lifestyle image",
    aspectRatio = "16/9",
}) {
    if (!src) {
        return null;
    }

    return (
        <section className="my-8 w-full">
            <div
                className="relative overflow-hidden rounded-2xl bg-(--secondary-color)"
                style={{ aspectRatio }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                />
            </div>
        </section>
    );
}
