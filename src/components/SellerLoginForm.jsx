// frontend/src/components/SellerLoginForm.jsx
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema } from "../schemas/auth/loginSchema.js";
import { Link } from "react-router-dom";


const SellerLoginForm = ({
    onSubmit,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    submitButtonClassName,
    setTab
}) => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username/Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Username or Email"
                                    {...field}
                                    className="w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Password"
                                        {...field}
                                        className="w-full pr-10"
                                    />
                                </FormControl>
                                <button
                                    type="button"
                                    onClick={
                                        togglePasswordVisibility
                                    }
                                    className="cursor-pointer absolute inset-y-0 end-2.5 text-gray-400 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:focus:text-blue-500"
                                >
                                    {showPassword ? (
                                        <FaEye size={18} />
                                    ) : (
                                        <FaEyeSlash size={18} />
                                    )}
                                </button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="text-sm text-right">
                    <button
                        type="button"
                        onClick={() => setTab("forgot-password")}
                        className="text-green-500 hover:underline cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>

            </form>
        </Form>
    );
};

export default SellerLoginForm;