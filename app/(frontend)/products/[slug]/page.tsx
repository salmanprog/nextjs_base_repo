
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
            <section className="sec-gap">
                <div className="container">
                    <div className="product-description-content text-center">
                        <div className="flex justify-center gap-4 items-center">

                            <h2 className="text-[20px] font-bold">Product Description
                            </h2>
                            {product.packages?.priceDescription && (
                                <p className="text-xl text-gray-600">{product.packages?.priceDescription}</p>
                            )}
                        </div>
                        {product.packages?.description && (
                            <p className="text-xl text-gray-600">{product.packages?.description} To add to cart click the button below </p>
                        )}
                    </div>
                </div>


            </section>
        </>
    )
}