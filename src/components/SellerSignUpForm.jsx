// frontend/src/components/SellerSignUpForm.jsx
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
import { Checkbox } from "./ui/checkbox.jsx";
import { Label } from "./ui/label.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpSchema } from "../schemas/auth/signUpSchema.js";


const SellerSignUpForm = ({
    onSubmit,
    isSubmitting,
    username,
    usernameMessage,
    isCheckingUsername,
    debounced,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    submitButtonClassName,
    setTab
}) => {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            contact: "",
            password: "",
            confirmPassword: "",
            terms: false,
            role: ["seller"],
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                {/* Full Name */}
                <FormField
                    name="fullName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username */}
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Username"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        debounced(e.target.value);
                                    }}
                                />
                            </FormControl>
                            {isCheckingUsername && <Loader2 className="animate-spin" />}
                            {username && (
                                <p
                                    className={`text-sm ${usernameMessage === "Username is available"
                                        ? "text-green-500 dark:text-green-400"
                                        : "text-red-500 dark:text-red-400"
                                        }`}
                                >
                                    {usernameMessage}
                                </p>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact */}
                <FormField
                    name="contact"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="cursor-pointer absolute inset-y-0 end-2.5 text-gray-400 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:focus:text-blue-500"
                                >
                                    {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                </button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password */}
                <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="cursor-pointer absolute inset-y-0 end-2.5 text-gray-400 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:focus:text-blue-500"
                                >
                                    {showConfirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                </button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Terms & Conditions */}
                <FormField
                    name="terms"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-3">
                                <FormControl>
                                    <Checkbox
                                        id="terms"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <Label htmlFor="terms" className="cursor-pointer">
                                    I accept all the terms and conditions
                                </Label>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        // Delete this later
                        // onClick={() => setTab("verify-otp-register")}
                        className={`${submitButtonClassName} w-full font-semibold bg-green-500 hover:bg-green-600 text-gray-200`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SellerSignUpForm;