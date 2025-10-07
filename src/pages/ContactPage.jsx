// frontend/src/pages/ContactPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { messageContactSchema } from "../schemas/messageContactSchema.js";


const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(messageContactSchema),
        defaultValues: {
            fullName: "",
            email: "",
            contact: "",
            message: ""
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Simulate form submission (replace with actual API call if needed)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        form.reset();
    };

    return (
        <section className="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#2D3748] p-8 rounded-lg shadow-lg">
                {/* Informational Section */}
                <div className="space-y-5">
                    <h1 className="text-3xl font-bold text-white">Contact Us</h1>
                    <p className="text-[#A0AEC0]">
                        Whether you’re a bidder, a seller, or a partner — we’d love to hear from you. Have a question, a suggestion, or want to collaborate? Reach out and we’ll get back to you soon.
                    </p>
                    <img
                        src="/images/contact_bg.jpg"
                        alt="Contact Us Image"
                        className="rounded-lg object-cover"
                    />

                    <div className="flex items-baseline-last justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                Office Address
                            </h3>
                            <p className="text-gray-400">Kathmandu, Nepal</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mt-4">
                                Business Inquiries
                            </h3>
                            <p className="text-gray-400">
                                support@leelame.com <br />
                                +977 9800000000
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#CBD5E0]">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Name"
                                            {...field}
                                            className="bg-white text-[#1A202C] placeholder:text-[#A0AEC0]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#CBD5E0]">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                            className="bg-white text-[#1A202C] placeholder:text-[#A0AEC0]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="contact"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#CBD5E0]">Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your 10-digit Indian Number"
                                            {...field}
                                            className="bg-white text-[#1A202C] placeholder:text-[#A0AEC0]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="message"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#CBD5E0]">Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type your message here"
                                            {...field}
                                            className="bg-white text-[#1A202C] placeholder:text-[#A0AEC0] min-h-25 max-h-50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-[#1A202C] hover:bg-gray-200"
                            >
                                {isSubmitting ? (
                                    <>
                                        Please wait... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    );
};

export default ContactPage;