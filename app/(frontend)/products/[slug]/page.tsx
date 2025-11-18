
import Image from "next/image";
import { products } from "../data";
import { notFound } from "next/navigation";
import Link from "next/link";
import InnerBanner from "@/components/common/InnerBanner";

interface ProductDescriptionProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDescriptionPage({ params }: ProductDescriptionProps) {
    const { slug } = await params;

    // Find the product by slug
    const product = products.find((p) => p.slug === slug);

    // If product not found, show 404
    if (!product) {
        notFound();
    }

    return (
        <>
            <InnerBanner bannerClass="products-banner" title={'Product Description'} />
            <div>
                <h1>Product Description Page</h1>
            </div>
        </>
    )
}