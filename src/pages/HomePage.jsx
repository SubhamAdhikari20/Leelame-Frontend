// frontend/src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Loader2, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Api, { validateUsernameUnique } from "../api/Api.js";
import NotFoundPage from "./NotFoundPage.jsx";


const HomePage = ({ currentUser }) => {
    const { username } = useParams();
    const [isValidUser, setIsValidUser] = useState(null);
    const [phraseIndex, setPhraseIndex] = useState(0);

    // 1) Hero text phrases
    const phrases = currentUser
        ? [
            `Welcome, ${currentUser.fullName ?? currentUser.username}`,
            `Hello, ${currentUser.fullName ?? currentUser.username}`,
            `Bid on, ${currentUser.fullName ?? currentUser.username}`,
        ]
        : ["Leelame", "Your Bid Companion", "Bid with Peace of Mind"];

    useEffect(() => {
        const iv = setInterval(
            () => setPhraseIndex((i) => (i + 1) % phrases.length),
            3000
        );
        return () => clearInterval(iv);
    }, [phrases.length]);

    // // Check if username exists (only when visiting /:username route)
    // useEffect(() => {
    //     const checkUser = async () => {
    //         if (!username) {
    //             setIsValidUser(true); // homepage without username is always valid
    //             return;
    //         }
    //         try {
    //             const response = await Api.get(`/user/check-username?username=${username}`);
    //             const exists = response.data.exists;

    //             // Only allow if username exists and matches currentUser
    //             if (exists && currentUser && username === currentUser.username) {
    //                 setIsValidUser(true);
    //             }
    //             else {
    //                 setIsValidUser(false);
    //             }
    //         }
    //         catch (error) {
    //             setIsValidUser(false);
    //         }
    //     };
    //     checkUser();
    // }, [username, currentUser]);

    // if (isValidUser === null) {
    //     return (
    //         <section className="flex items-center justify-center h-screen">
    //             <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
    //         </section>
    //     );
    // }

    // if (!isValidUser) {
    //     return <NotFoundPage />;
    // }


    return (
        <>
            {/* ───────────────────────── Hero Section ───────────────────────── */}
            <section className="relative overflow-hidden px-4 md:px-0 min-h-screen flex items-center">
                {/* Background image */}
                <div className="absolute inset-0 z-10 hover:animate-out overflow-hidden">
                    <img
                        src="/images/bid_bg1.jpg"
                        alt="Bike Logo"
                        className="object-cover opacity-70 w-full h-full"
                    />

                    {/* Overlay gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 dark:from-blue-900/60 dark:to-gray-900/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 dark:to-background/80"></div>
                </div>

                <div className="container mx-auto flex flex-col items-center justify-center text-center gap-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
                        {phrases[phraseIndex]}
                    </h1>
                    {currentUser ? (
                        <>
                            {/* <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
                                Welcome, {currentUser.fullName ?? currentUser.username}
                            </h1> */}
                            <p className="max-w-xl text-gray-700 text-base sm:text-lg md:text-xl">
                                Your Premium Auction Platform. Whether you want to bid on antiques, electronics, or unique collectibles, we’ve got you covered.
                            </p>
                            <p className="max-w-xl text-gray-800 text-base sm:text-lg md:text-xl">
                                Enjoy real-time bid tracking, seamless payments, and 24/7 support—your bid, your way.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/products">
                                    <Button className="px-6 py-3 text-base">Browse Products</Button>
                                </Link>
                                <Link to="/my-bids">
                                    <Button variant="outline" className="px-6 py-3 text-base">
                                        My Bids
                                    </Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
                                Bike Buddy
                            </h1> */}
                            <p className="max-w-xl text-gray-700 text-base sm:text-lg md:text-xl">
                                Discover the thrill of online auctions. Bid on unique items quickly and securely with:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-md text-sm sm:text-base">
                                <li>Real-time bid tracking</li>
                                <li>Seamless payments</li>
                                <li>Flexible auction durations</li>
                                <li>24/7 customer support</li>
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/login">
                                    <Button className="px-6 py-3 text-base">Get Started</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Why Choose Leelame?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="p-0 gap-2">
                            <CardHeader className="p-0">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src="/images/wide_range_items.jpg"
                                        alt="Wide Range of Items"
                                        className="object-cover rounded-t-xl"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <CardTitle className="px-4 pt-2 text-xl font-semibold">Wide Range of Items</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-sm px-4 py-2 mb-2">
                                From antiques to electronics, find the perfect item to bid on for any interest.
                            </CardContent>
                        </Card>
                        <Card className="p-0 gap-2">
                            <CardHeader className="p-0">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src="/images/transparent_bidding.jpg"
                                        alt="Transparent Bidding"
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                                <CardTitle className="px-4 pt-2 text-xl font-semibold">Transparent Bidding</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-sm px-4 py-2 mb-2">
                                Clear bid history, live timers, and instant notifications — never miss a moment.
                            </CardContent>
                        </Card>
                        <Card className="p-0 gap-2">
                            <CardHeader className="p-0">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src="/images/real-time_bidding.jpg"
                                        alt="Real-Time Bidding"
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                                <CardTitle className="px-4 pt-2 text-xl font-semibold">Real-Time Bidding</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-sm px-4 py-2 mb-2">
                                Stay updated with live bid updates for an exciting and competitive auction experience.
                            </CardContent>
                        </Card>
                        <Card className="p-0 gap-2">
                            <CardHeader className="p-0">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src="/images/ai_recommendations.jpg"
                                        alt="AI Price Suggestions"
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                                <CardTitle className="px-4 pt-2 text-xl font-semibold">AI Price Suggestions</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-sm px-4 py-2 mb-2">
                                Get AI recommended bid ranges and probability hints to place smarter bids.
                            </CardContent>
                        </Card>
                        <Card className="p-0 gap-2">
                            <CardHeader className="p-0">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src="/images/secure_escrow.jpg"
                                        alt="Secure Escrow"
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                                <CardTitle className="px-4 pt-2 text-xl font-semibold">Secure Escrow</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-sm px-4 py-2 mb-2">
                                Funds are held in escrow until the item is verified and delivered — safer trades.
                            </CardContent>
                        </Card>
                        <Card className="p-0 gap-2">
                            <CardHeader className="p-0">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src="/images/secure_payment.jpg"
                                        alt="Secure Payments"
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                                <CardTitle className="px-4 pt-2 text-xl font-semibold">Secure Payments</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-sm px-4 py-2 mb-2">
                                Enjoy a smooth and secure payment process with integrated payment gateways for winning bids.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* ───────────────────── Testimonials ───────────────────── */}
            <section className="py-12 bg-background dark:bg-background-dark">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Subham Sharma",
                                role: "Collectibles Enthusiast",
                                avatar: "/images/pp1.jpg",
                                quote: `“Leelame’s real-time bid tracking turned my auction hunts into pure excitement—no more missing out on deals. Bidding was instant, the items were authentic, and payments were a breeze. Truly seamless from start to finish.”`
                            },
                            {
                                name: "Aayush Parazuli",
                                role: "Tech Bidder",
                                avatar: "/images/pp2.jpg",
                                quote: `“I placed a bid on Leelame for a rare gadget and was blown away by the smooth app experience. Updating my bid took seconds, the notifications were spot-on, and I won the auction. Top-notch service!”`
                            },
                            {
                                name: "Susmita Malla",
                                role: "Art Collector",
                                avatar: "/images/pp3.jpg",
                                quote: `“Whether I'm bidding on vintage art or modern pieces, Leelame delivers perfect reliability. Their 24/7 support, transparent pricing, and live bid updates mean I can bid with total confidence.”`
                            },
                            {
                                name: "Rajan Thapa",
                                role: "Collector",
                                avatar: "/images/pp5.jpg",
                                quote: `“Leelame helped me land a rare vintage camera — the bidding UI and escrow flow were flawless.”`
                            },
                            {
                                name: "Nisha Gurung",
                                role: "Reseller",
                                avatar: "/images/pp4.jpg",
                                quote: `“Fast payouts, helpful AI suggestions, and reliable buyer verification. Highly recommended.”`
                            },
                            {
                                name: "Prakash Singh",
                                role: "Casual Bidder",
                                avatar: "/images/pp6.jpg",
                                quote: `“The live timers and bid reminders made bidding so much simpler. Won my first auction here!”`
                            },
                        ].map((t, i) => (
                            <Card key={i} className="bg-muted p-6">
                                <CardContent className="flex flex-col h-full justify-between">
                                    <div className="space-y-4">
                                        <Quote className="w-6 h-6 text-muted-foreground" />
                                        <p className="text-sm text-foreground leading-relaxed md:text-[16px]">
                                            {t.quote}
                                        </p>
                                    </div>
                                    <div className="flex items-center mt-6">
                                        <Avatar className="border-1 border-black w-15 h-15">
                                            <AvatarImage src={t.avatar} alt={t.name} />
                                            <AvatarFallback>{t.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 text-left">
                                            <p className="font-medium text-foreground">{t.name}</p>
                                            <p className="text-xs text-muted-foreground">{t.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────────────── Call To Action ───────────────────── */}
            <section className="relative h-[600px] sm:h-[900px] flex items-center overflow-hidden">
                {/* Background image */}
                <img
                    src="/images/bid_bg2.jpg"
                    alt="Auction Adventure"
                    className="object-cover opacity-70 absolute z-10 inset-0 w-full h-full"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />

                <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-4">
                    <h2 className="text-4xl sm:text-5xl font-extrabold">
                        Start Bidding Today
                    </h2>
                    <p className="max-w-xl mx-auto text-lg sm:text-xl">
                        Bid on exciting items in seconds and win big in our online auctions.
                    </p>
                    <Link to="/products">
                        <Button size="lg" className="mt-4 bg-gray-50 text-gray-800 font-bold text-[17px] hover:bg-gray-200">
                            Start Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Demo / Video Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-center mb-8">Experience Leelame in Action</h2>
                    <div className="w-full max-w-3xl aspect-video rounded overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/C-eCWfDIUXA?si=CrADAmA31-Hcqron"
                            title="Leelame Demo Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;