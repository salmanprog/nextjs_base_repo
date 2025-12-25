"use client";

import { useCartStore } from "@/zustand/cart";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import InnerBanner from "@/components/common/InnerBanner";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
    const cartTotal = getCartTotal();

    return (
        <>
            <InnerBanner bannerClass="products-banner" title={'Shopping Cart'} />
            <section className="cart-section sec-gap bg-gray-50 flex-grow min-h-[50vh]">
                <div className="container">
                    {cart.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
                            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                            <Link href="/" className="btn btn-primary inline-block">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items */}
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                    <div className="p-6 border-b border-gray-100 hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                                        <div className="col-span-6">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-center">Total</div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {cart.map((item) => (
                                            <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                                                <div className="col-span-6 w-full flex items-center gap-4">
                                                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 relative">
                                                        <Image src={item.image} fill className="object-cover" alt={item.title} />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                                        <button 
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700 transition-colors"
                                                        >
                                                            <FaTrash className="text-xs" /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 font-medium text-gray-800 text-center md:text-left">
                                                    {item.price}
                                                </div>
                                                <div className="col-span-2 flex items-center justify-center">
                                                     <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-gray-100 transition-colors text-gray-600 outline-none"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FaMinus className="text-xs" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-gray-900 border-l border-r border-gray-300 py-1 bg-gray-50">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-100 transition-colors text-gray-600 outline-none"
                                                        >
                                                            <FaPlus className="text-xs" />
                                                        </button>
                                                     </div>
                                                </div>
                                                <div className="col-span-2 text-right md:text-center font-bold text-gray-900">
                                                    ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Summary */}
                            <div className="lg:w-1/3">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
                                    <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="text-green-600 font-medium">Free</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button className="w-full btn btn-primary py-3 text-center text-lg font-bold shadow-md hover:shadow-lg transition-all">
                                        Proceed to Checkout
                                    </button>
                                    <div className="mt-4 text-center">
                                        <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors hover:underline">
                                            or Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
