// frontend/src/pages/AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";


const AboutPage = () => {
    return (
        <>
            <section className="relative h-64 md:h-96 w-full overflow-hidden text-gray-800">
                <div className="absolute inset-0 z-10 hover:animate-out overflow-hidden">
                    <img
                        src="/images/bid_bg3.jpg"
                        alt="Online auction background"
                        className="object-cover opacity-85 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 dark:from-blue-900/60 dark:to-gray-900/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 dark:to-background/90 bg-opacity-20" />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                        About Leelame
                    </h1>
                    <p className="mt-2 text-sm md:text-lg font-semibold text-gray-100 max-w-2xl">
                        The modern platform redefining how people buy, sell, and bid — powered by trust, transparency, and AI.
                    </p>
                    <Link to="/products">
                        <Button
                            variant="outline"
                            className="mt-6 px-6 py-3 text-base text-gray-600 hover:text-gray-900"
                        >
                            Explore Products
                        </Button>
                    </Link>
                </div>
            </section>

            {/* ───── Content Card ───── */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <Card className="max-w-3xl mx-auto shadow-lg">
                        <CardHeader className="bg-white">
                            <CardTitle className="text-2xl font-bold text-green-600">
                                Our Story
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p>
                                Founded in 2025, <span className="font-semibold text-green-700">Leelame</span> was created to make online auctions smarter, faster, and fairer for everyone.
                                What started as a small student project evolved into a full-scale
                                marketplace connecting bidders and sellers across Nepal and beyond.
                            </p>

                            <h3 className="text-xl font-semibold text-green-600">What We Offer</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Real-time live bidding experience with instant updates.</li>
                                <li>AI-powered price predictions and fraud detection.</li>
                                <li>Secure authentication and payment processing.</li>
                                <li>Verified user profiles and auction transparency.</li>
                                <li>Smart recommendation system to help you find valuable deals.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-green-600">Our Mission</h3>
                            <p>
                                We believe to empower individuals and businesses to trade confidently in a transparent, intelligent, and user-friendly environment. We aim to bridge the gap between traditional marketplaces and the digital future - one bid at a time.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default AboutPage;