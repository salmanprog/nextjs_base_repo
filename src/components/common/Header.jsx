"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons/Index";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <header className="header">
            <nav className={`navs-wrapper ${isOpen ? 'active' : ''} flex`}>
                <ul className={`primary-navs mx-auto flex justify-between items-center grow-1`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/">Photo Access</a></li>
                    <li className="md-none">
                        <a href="">
                            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                        </a>
                    </li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Blog</a></li>
                </ul>
            </nav>
            <button className="menu-icon" onClick={toggleMenu}>
                {isOpen ? <Icons.close className="text-[24px]" /> : <Icons.menu className="text-[24px]" />}
            </button>
        </header>
    );
}
