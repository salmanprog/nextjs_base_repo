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
                question: "How do we order?",
                answer: "Click Here."
            },
            {
                question: "Will there be photographs of my son/daughter?",
                answer: "Do not know for sure. At the Herndon Monument Climb, we are only able to photograph Plebes who are actually climbing the monument. At Sea Trials, probably as we photograph every company at one of the 36 evolutions. The evolution we photographs is the Mud Crawl. It is the best evolution and unlike any Plebe Summer evolution."
            },
            {
                question: "How will the Sea Trials photographs be organized?",
                answer: "By companies."
            },
            {
                question: "How many photographs will there be of my son/daughter.",
                answer: "We do not know. If your son/daughter is on zero block or excused from Sea Trials, not at all. If injured, heshe will be on the sidelines and we will photograph him/her."
            }
        ],
        "graduations-commissioning": [
            {
                question: "How do we order?",
                answer: "Click Here."
            },
            {
                question: "How many photographs will there be of my son/daughter?",
                answer: "Probably 5-10, but we can not make any guarantee."
            },
            {
                question: "Do I have to sign up prior to Graduation Day?",
                answer: "No you do not, but after May 15 there is a price increase and photographs are available for thirty days only."
            },
            {
                question: "Will there be photographs of my son/daughter other than during the processional, hand shake, and leaving stage?",
                answer: "We do not know as these are all candids. We do photographs the graduate sin their sets during various parts of the ceremony."
            },
            {
                question: "How accurate is the Grad Finder?",
                answer: "It is a Facial Recognition Program so there are no guarantees, and no refunds if it does not work. Its effectiveness will depend in part on the photographs you upload for the Facial Recognition program to do its job."
            },
            {
                question: "How large are the files?",
                answer: "Large enough to make a good quality 8x10 photograph, and certainly great for Social media."
            },
            {
                question: "Can the files be cropped?",
                answer: "Yes. We leave extra room when we take each photo for cropping purposes?"
            },
            {
                question: "Will the TOP 100 be photographed?",
                answer: "Yes. Unfortunately the position of the dignitary who shakes the Top 100's hand is partially blocked. Also, the view from the left side is the best angle for the TOP 100."
            },
            {
                question: "Are refunds available?",
                answer: "Sorry, they are not."
            },
            {
                question: "Can we download photographs of the other parts of the ceremony?",
                answer: "Yes. That way you do not have to be too worried about good photographs from the nose-bleed sections of the stadium. We have the best angle and are close with our long lenses."
            },
            {
                question: "What is the angle of your camera when you photograph the handshake and the leaving stage?",
                answer: "We photograph from the best angle to capture the handshake and leaving stage moments with our professional long lenses."
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
                                    <span className="">To add to cart</span>
                                    <div className="mt-6">
                                        <Link
                                            href="#"
                                            className="btn btn-primary inline-flex items-center gap-2"
                                        >
                                            <Image src="/images/waldo-logo.png" alt="cart" width={100} height={100} />
                                            <span>Click Me</span>
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