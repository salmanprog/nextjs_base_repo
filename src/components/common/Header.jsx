"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons/Index";
import { useCurrentUser } from "@/utils/currentUser";
import Link from "next/link";
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <header className="header">
            <div className="container">
                <nav className={`navs-wrapper flex items-center justify-between`}>
                    <ul className={`primary-navs mx-auto flex justify-between items-center ${isOpen ? 'active' : ''} grow-1`}>
                        <li><Link className="primary-nav-link" href="/">Home</Link></li>
                        <li><Link className="primary-nav-link" href="/products">Products</Link></li>
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
