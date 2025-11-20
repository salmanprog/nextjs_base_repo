"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import InnerBanner from "@/components/common/InnerBanner";
import useApi from "@/utils/useApi";

interface ProductDescriptionProps {
    params: Promise<{ slug: string }>;
}

interface Event {
    id: number;
    name: string;
    slug: string;
    categoryId: number;
    price: number | null;
    imageUrl: string | null;
    description: string | null;
    category: {
        id: number;
        title: string;
        slug: string;
    } | null;
    status: boolean;
    createdAt: string;
}

export default function ProductDescriptionPage({ params }: ProductDescriptionProps) {
    // Use React's use() hook to unwrap the Promise synchronously
    const { slug } = use(params);
    const [events, setEvents] = useState<Event[]>([]);

    const { data, loading: apiLoading, error: apiError, fetchApi } = useApi({
        url: `/api/users/events?cat_id=${slug}`,
        type: "manual",
        method: "GET",
        requiresAuth: false,
    });

    // Fetch events when slug is available
    useEffect(() => {
        if (slug) {
            fetchApi();
        }
    }, [slug]);

    // Update events when data is received
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setEvents(data);
        }
    }, [data]);

    return (
        <>
            <InnerBanner bannerClass="products-banner" title={'Product Description'} />
            <section className="sec-gap">
                <div className="container">
                    {apiLoading ? (
                        <div className="text-center py-8">Loading events...</div>
                    ) : apiError ? (
                        <div className="text-center py-8 text-red-500">Error loading events: {apiError}</div>
                    ) : events.length > 0 ? (
                        <div className="product-description-content">
                            {events.map((event) => (
                                <div key={event.id} className="text-center mb-8">
                                    <div className="flex justify-center gap-4 items-center mb-4">
                                        <h2 className="text-[20px] font-bold">{event.name}</h2>
                                        {event.price !== null && (
                                            <p className="text-xl text-gray-600">Price: ${event.price.toFixed(2)}</p>
                                        )}
                                    </div>
                                    {event.description && (
                                        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                                            {event.description}
                                        </p>
                                    )}
                                    <div className="mt-6">
                                        <Link 
                                            href="#" 
                                            className="btn btn-primary inline-flex items-center gap-2"
                                        >
                                            <span>Add To Cart</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-xl text-gray-600">No events found for this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}