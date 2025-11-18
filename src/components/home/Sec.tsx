'use client';
import Link from "next/link";

export default function Sec({ title, sectionClass, href }: { title: string, sectionClass: string, href: string }) {
    return (
        <Link href={href || "/"}>
            <section className={`home-sec h-screen flex items-center ${sectionClass}`}>
                <div className="container">
                    <h2 className="hd-lg text-center">{title}</h2>
                </div>
            </section>
        </Link>
    )
}