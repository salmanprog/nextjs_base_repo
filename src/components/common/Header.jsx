"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { Icons } from "@/components/icons/Index";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const productsRef = useRef(null);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Get unique product categories from products data
    const productCategories = [
        { name: "SeaTrials / Herndon", path: "/products" },
        { name: "Graduations / Commissioning", path: "/products" },
        { name: "Plebe Summer", path: "/products" },
        { name: "Studio Collection", path: "/products" },
    ];

    // Handle hover for products dropdown
    const handleMouseEnter = () => {
        setIsProductsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsProductsDropdownOpen(false);
    };

    return (
        <header className="header">
            <div className="container">
                <nav className={`navs-wrapper flex items-center justify-between`}>
                    <ul className={`primary-navs mx-auto flex justify-between items-center ${isOpen ? 'active' : ''} grow-1`}>
                        <li><Link className="primary-nav-link" href="/">Home</Link></li>
                        <li 
                            ref={productsRef}
                            className="relative group dropdown-li"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link className="primary-nav-link" href="#">Products</Link>
                            {/* Invisible bridge to cover gap between nav and dropdown */}
                            <div
                                className={`absolute left-0 top-full w-full h-2 z-50 ${
                                    isProductsDropdownOpen ? 'block' : 'hidden'
                                }`}
                                onMouseEnter={handleMouseEnter}
                            />
                            <div
                                className={`absolute left-0 top-[calc(100%+8px)] w-64 z-50 ${
                                    isProductsDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                                }`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="rounded-xl border border-gray-600 bg-black shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark transition-all duration-200">
                                    <ul className="py-2 dropdown-ul">
                                        {productCategories.map((category, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={category.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                                                    onClick={() => setIsProductsDropdownOpen(false)}
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
