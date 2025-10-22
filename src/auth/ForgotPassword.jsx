// frontend/src/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../components/ui/form";
import { forgotPassword } from "../api/Api";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { forgotPasswordSchema } from "./../schemas/auth/forgotPasswordSchema.js";


const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await forgotPassword({
                email: data.email,
            });
            toast.success("Success", {
                description: response.data.message,
            });

            navigate(`/verify-account-reset-password/${data.email}`);
        }
        catch (error) {
            console.error("Error sending forgot password request", error);
            toast("Failed", {
                description:
                    error.response.data.message ||
                    "Failed to send reset instructions",
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex justify-center items-center px-5 py-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 border rounded-lg shadow-md">
                <Button
                    variant="ghost"
                    className="relative top-2 left-2 text-gray-600 dark:text-gray-400 hover:text-blue-950 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                    onClick={() => navigate("/login")}
                    aria-label="Back to login"
                >
                    <ArrowLeft size={24} />
                </Button>

                <div className="px-8 pb-8">
                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                        Forgot Password
                    </h1>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
                        Enter your email address to receive password reset
                        instructions.
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="you@example.com"
                                                {...field}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
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
                                    className="w-full font-semibold"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Code"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <div className="text-center mt-4">
                        <p>
                            Back to login?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;