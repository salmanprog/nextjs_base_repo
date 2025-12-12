'use client';
import Link from "next/link";

export default function Sec({
    title,
    sectionClass,
    href,
    backgroundImage
}: {
    title: string;
    sectionClass?: string;
    href: string;
    backgroundImage?: string | null;
}) {
    return (
        <Link href={href || "/"}>
            <div
                className={`home-sec relative overflow-hidden rounded-[20px]  ${sectionClass || ''}`}
                style={backgroundImage ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                } : {}}
            >
                {/* Title Box at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0a1628] text-white p-6 z-10">
                    <h3 className="text-xl font-bold text-[var(--primary-theme)]">{title}</h3>
                </div>
            </div>
        </Link>
    )
}