"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons/Index";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <header className="header">
            <div className="container">
                <nav className={`navs-wrapper flex items-center`}>
                    <ul className={`primary-navs mx-auto flex justify-between items-center ${isOpen ? 'active' : ''} grow-1`}>
                        <li><a className="primary-nav-link" href="/">Home</a></li>
                        <li><a className="primary-nav-link" href="/products">Products</a></li>
                        <li><a className="primary-nav-link" href="/">Photo Access</a></li>
                        <li className="md-none">
                            <a href="">
                                <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                            </a>
                        </li>
                        <li><a className="primary-nav-link" href="/">About</a></li>
                        <li><a className="primary-nav-link" href="/">Contact</a></li>
                        <li><a className="primary-nav-link" href="/">Blog</a></li>
                    </ul>
                    <a href="">
                        <Image src="/images/logo.png" alt="Logo" className="block md:hidden" width={100} height={100} />
                    </a>
                    <div className="flex items-center gap-2">

                        <a className="btn btn-primary" href="/login">Login</a>
                        <a className="btn btn-secondary" href="/signup">Signup</a>
                        <button className="menu-icon" onClick={toggleMenu}>
                            {isOpen ? <Icons.close className="text-[24px]" /> : <Icons.menu className="text-[24px]" />}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
