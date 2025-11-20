"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import InnerBanner from "@/components/common/InnerBanner";
import FaqList from "@/components/faq/FaqList";
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

// FAQs mapping for different slugs
const getFaqsBySlug = (slug: string) => {
    const faqsMap: Record<string, Array<{ question: string; answer: string }>> = {
        "sea-trials-herndon": [
            {
                question: "What are Sea Trials and Herndon?",
                answer: "Sea Trials and Herndon are important Naval Academy traditions. Sea Trials test the plebes' physical and mental endurance, while Herndon Monument Climb marks the end of Plebe Year."
            },
            {
                question: "When do Sea Trials and Herndon take place?",
                answer: "Sea Trials typically occur in late April, and the Herndon Monument Climb happens in May, marking the end of the academic year for plebes."
            },
            {
                question: "How can I order photos from these events?",
                answer: "You can browse our collection and add photos to your cart. All photos are professionally captured and available in various formats."
            }
        ],
        "graduations-commissioning": [
            {
                question: "What is included in Graduation and Commissioning photos?",
                answer: "Our graduation and commissioning collection includes ceremony photos, individual portraits, group photos, and candid moments from this special day."
            },
            {
                question: "When will graduation photos be available?",
                answer: "Photos are typically available within 2-3 weeks after the graduation ceremony. You'll receive a notification when your photos are ready."
            },
            {
                question: "Can I order prints in different sizes?",
                answer: "Yes, we offer various print sizes and formats. You can select your preferred option when adding items to your cart."
            }
        ],
        "plebe-summer": [
            {
                question: "What is Plebe Summer?",
                answer: "Plebe Summer is the intensive 7-week training period for incoming Naval Academy midshipmen, marking the beginning of their journey at USNA."
            },
            {
                question: "How long have you been photographing Plebe Summer?",
                answer: "Since 1980, Thornton Studios has been the only approved vendor to photograph Plebe Summer, serving the Naval Academy for over 45 years."
            },
            {
                question: "When can I view and purchase Plebe Summer photos?",
                answer: "Photos are typically available after the completion of Plebe Summer. Check back regularly or contact us for specific availability dates."
            },
            {
                question: "Are you an approved NABSD vendor?",
                answer: "Yes, Thornton Studios is approved by the Naval Academy Business Service Division (NABSD) and is the only approved vendor for Plebe Summer photography."
            }
        ],
        "studio-collection": [
            {
                question: "What is included in the Studio Collection?",
                answer: "Our Studio Collection features professional portraits, formal photos, and studio-quality images of midshipmen in various uniforms and settings."
            },
            {
                question: "Can I schedule a studio session?",
                answer: "Yes, studio sessions can be scheduled. Please contact us for availability and booking information."
            },
            {
                question: "What formats are available for studio photos?",
                answer: "We offer digital downloads, prints in various sizes, and custom framing options for all studio collection photos."
            }
        ]
    };

    // Return FAQs for the specific slug, or default FAQs if slug not found
    return faqsMap[slug] || [
        {
            question: "How can I order photos?",
            answer: "Browse our collection, select your favorite photos, and add them to your cart. You can complete your purchase through our secure checkout process."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards and other standard payment methods through our secure payment gateway."
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping times vary based on your location and the type of product ordered. Digital downloads are available immediately after purchase."
        }
    ];
};

export default function ProductDescriptionPage({ params }: ProductDescriptionProps) {
    // Use React's use() hook to unwrap the Promise synchronously
    const { slug } = use(params);
    
    // Get FAQs based on slug
    const faqs = getFaqsBySlug(slug);
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

            {/* remove the dashes */}
            <InnerBanner bannerClass="products-banner capitalize" title={slug.replace(/-/g, ' ')} />

            <section className="sec-gap">

                <div className="container">
                    {apiLoading ? (
                        <div className="text-center py-8 loading-text"></div>
                    ) : apiError ? (
                        <div className="text-center py-8 text-red-500">Error loading events: {apiError}</div>
                    ) : events.length > 0 ? (
                        <div className="product-description-content">
                            {events.map((event) => (
                                <div key={event.id} className="text-center description-content-item mb-8">
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
            <section className="pb-20">
                <div className="container mx-auto">
                    <FaqList faqs={faqs} />
                </div>
            </section>
        </>
    )
}