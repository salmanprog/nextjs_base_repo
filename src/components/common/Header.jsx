"use client";
import Image from "next/image";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { Icons } from "@/components/icons/Index";
import { useCurrentUser } from "@/utils/currentUser";
import Link from "next/link";

// Move productCategories outside component to prevent recreation
const PRODUCT_CATEGORIES = [
    { name: "SeaTrials / Herndon", path: "/products" },
    { name: "Graduations / Commissioning", path: "/products" },
    { name: "Plebe Summer", path: "/products" },
    { name: "Studio Collection", path: "/products" },
];

export default function Header() {
    console.log("Header");
    
    const [isOpen, setIsOpen] = useState(false);
    const hoverRef = useRef(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const productCategories = useMemo(() => PRODUCT_CATEGORIES, []);

    const handleMouseEnter = useCallback(() => {
        if (!hoverRef.current) {
            hoverRef.current = true;
            setIsProductsDropdownOpen(true);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        hoverRef.current = false;
        setIsProductsDropdownOpen(false);
    }, []);

    const handleDropdownClick = useCallback(() => {
        setIsProductsDropdownOpen(false);
    }, []);

    return (
        <header className="header">
            <div className="container">
                <nav className={`navs-wrapper flex items-center justify-between`}>
                    <ul className={`primary-navs mx-auto flex justify-between items-center ${isOpen ? 'active' : ''} grow-1`}>
                        <li><Link className="primary-nav-link" href="/">Home</Link></li>
                        <li className="relative dropdown-li">
                            <Link className="primary-nav-link" href="#">Products</Link>

                            <div className="dropdown absolute left-0 top-full w-64 z-50">
                                <div className="rounded-xl border border-gray-600 bg-black shadow-theme-lg">
                                    <ul className="py-2 dropdown-ul">
                                        {PRODUCT_CATEGORIES.map((category, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={category.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li><Link className="primary-nav-link" href="/">Photo Access</Link></li>
                        <li className="md-none">
                            <Link href="/">
                                <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                            </Link>
                        </li>
                        <li><Link className="primary-nav-link" href="/about-us">About Us</Link></li>
                        <li><Link className="primary-nav-link" href="/contact">Contact</Link></li>
                        <li><Link className="primary-nav-link" href="#">Blog</Link></li>
                    </ul>
                    <Link href="/">
                        <Image src="/images/logo.png" alt="Logo" className="block md:hidden" width={100} height={100} />
                    </Link>
                    <div className="flex items-center gap-2">

                        <Link className="btn btn-primary" href="/login">Login</Link>
                        <Link className="btn btn-secondary" href="/signup">Signup</Link>
                        <button className="menu-icon" onClick={toggleMenu}>
                            {isOpen ? <Icons.close className="text-[24px]" /> : <Icons.menu className="text-[24px]" />}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
