// frontend/src/pages/BecomeSeller.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../components/ui/card.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form.jsx";
import { Separator } from "../components/ui/separator.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs.jsx";
import { toast } from "sonner";
import { verifyAccountRegistrationSchema } from "../schemas/auth/verifyAccountRegistrationSchema.js";
import { forgotPasswordSchema } from "../schemas/auth/forgotPasswordSchema.js";
import { verifyAccountResetPasswordSchema } from "../schemas/auth/verifyAccountResetPasswordSchema.js";
import { resetPasswordSchema } from "../schemas/auth/resetPasswordSchema.js";
import LoginForm from "@/components/SellerLoginForm.jsx";
import SellerSignUpForm from "@/components/SellerSignUpForm.jsx";
import { useDebounceCallback } from "usehooks-ts";
import { Loader2 } from "lucide-react";


const BecomeSeller = () => {
    const [tab, setTab] = useState("signup");
    const [otpSent, setOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const debounced = useDebounceCallback(setUsername, 300);

    const forgotPasswordForm = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });

    const verifyCodeForm = useForm({
        resolver: zodResolver(verifyAccountResetPasswordSchema),
        defaultValues: {
            code: ""
        },
    });

    const resetPasswordForm = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            otp: "", newPassword: "",
            confirmPassword: ""
        },
    });

    const handleSignUp = (values) => {
        toast.success(`OTP sent to ${values.phone}`);
    };

    const handleLogin = (values) => {
        toast.success(`Logged in as ${values.identifier}`);
        navigate("/");
    };

    const handleForgotPassword = (values) => {
        toast.success(`OTP sent to ${values.email}`);
        setOtpSent(true);
    };

    const handleVerifyCode = (values) => {
        toast.success(`OTP sent to ${values.identifier}`);
        setOtpSent(false);
        setTab("reset-password");
    };

    const handleResetPassword = (values) => {
        toast.success("Password reset successful!");
        setOtpSent(false);
        setTab("login");
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    return (
        <section className="flex items-center justify-center px-5 py-15 sm:px-6 lg:px-8">
            <Card className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-900 border grid md:grid-cols-2">
                {/* Left banner section */}
                <div className="hidden md:flex flex-col justify-center bg-green-600 text-white px-10 py-12 space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight">
                        Grow Your Business <br /> With Leelame!
                    </h1>
                    <p className="text-lg opacity-90">
                        Join our seller network and reach thousands of buyers every day.
                    </p>
                    <div className="flex items-center gap-6 mt-6">
                        <div>
                            <h2 className="text-3xl font-bold">0%</h2>
                            <p className="text-sm opacity-80">Commission for first 30 days</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">5M+</h2>
                            <p className="text-sm opacity-80">Active buyers on Leelame</p>
                        </div>
                    </div>
                </div>

                {/* Right form section */}
                <CardContent className="flex flex-col justify-center p-8">
                    {(tab === "signup" || tab === "login") && (
                        <>
                            {otpSent ? (
                                <Tabs value={tab} onValueChange={setTab}>
                                    <TabsList className="grid grid-cols-2 mb-6 w-full">
                                        <TabsTrigger value="signup">Sign up</TabsTrigger>
                                        <TabsTrigger value="login">Login</TabsTrigger>
                                    </TabsList>

                                    {/* Signup */}
                                    <TabsContent value="signup">
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle>Sign up as a Leelame Seller</CardTitle>
                                            <CardDescription>
                                                Already have an account?{" "}
                                                <button
                                                    onClick={() => setTab("login")}
                                                    className="text-green-500 hover:underline cursor-pointer"
                                                >
                                                    Log in
                                                </button>
                                            </CardDescription>
                                        </CardHeader>
                                        <SellerSignUpForm
                                            onSubmit={handleSignUp}
                                            isSubmitting={isSubmitting}
                                            usernameMessage={usernameMessage}
                                            isCheckingUsername={isCheckingUsername}
                                            debounced={debounced}
                                            showPassword={showPassword}
                                            togglePasswordVisibility={togglePasswordVisibility}
                                            showConfirmPassword={showConfirmPassword}
                                            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                                        />
                                    </TabsContent>

                                    {/* Login */}
                                    <TabsContent value="login">
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle>Login with Password</CardTitle>
                                            <CardDescription>
                                                Don’t have an account?{" "}
                                                <button
                                                    onClick={() => setTab("signup")}
                                                    className="text-green-500 hover:underline cursor-pointer"
                                                >
                                                    Create
                                                </button>
                                            </CardDescription>
                                        </CardHeader>

                                        <LoginForm
                                            onSubmit={handleLogin}
                                            isSubmitting={isSubmitting}
                                            showPassword={showPassword}
                                            togglePasswordVisibility={togglePasswordVisibility}
                                            setTab={setTab}
                                        />
                                    </TabsContent>
                                </Tabs>
                            ) : (
                                <>
                                    <CardHeader className="p-0 mb-4">
                                        <CardTitle>Verify OTP</CardTitle>
                                        <CardDescription>
                                            Enter the OTP for account registration.
                                        </CardDescription>
                                    </CardHeader>
                                    <Form {...verifyCodeForm}>
                                        <form
                                            onSubmit={verifyCodeForm.handleSubmit(handleVerifyCode)}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={verifyCodeForm.control}
                                                name="otp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>OTP</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter OTP" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                onClick={() => { setTab("reset-password"); }}
                                                className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Please wait...
                                                    </>
                                                ) : (
                                                    "Verify"
                                                )}
                                            </Button>
                                            <button
                                                onClick={() => {
                                                    setOtpSent(false);
                                                    setTab("signup");
                                                }}
                                                type="button"
                                                className="text-sm text-green-500 hover:underline block text-center w-full cursor-pointer"
                                            >
                                                Back to Sign up
                                            </button>
                                        </form>
                                    </Form>
                                </>
                            )}
                        </>

                    )}

                    {/* Forgot Password / Verify OTP */}
                    {tab === "forgot-password" && (
                        <>
                            {!otpSent ? (
                                <>
                                    <CardHeader className="p-0 mb-4">
                                        <CardTitle>Forgot Password</CardTitle>
                                        <CardDescription>
                                            Enter your registered email to receive an OTP.
                                        </CardDescription>
                                    </CardHeader>
                                    <Form {...forgotPasswordForm}>
                                        <form
                                            onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={forgotPasswordForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="example@mail.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Please wait...
                                                    </>
                                                ) : (
                                                    "Send OTP"
                                                )}
                                            </Button>
                                            <button
                                                onClick={() => setTab("login")}
                                                type="button"
                                                className="text-sm text-green-500 hover:underline block text-center w-full cursor-pointer"
                                            >
                                                Back to Login
                                            </button>
                                        </form>
                                    </Form>
                                </>
                            ) : (
                                <>
                                    <CardHeader className="p-0 mb-4">
                                        <CardTitle>Verify OTP</CardTitle>
                                        <CardDescription>
                                            Enter the OTP for reset password.
                                        </CardDescription>
                                    </CardHeader>
                                    <Form {...verifyCodeForm}>
                                        <form
                                            onSubmit={verifyCodeForm.handleSubmit(handleVerifyCode)}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={verifyCodeForm.control}
                                                name="otp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>OTP</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter OTP" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                onClick={() => { setTab("reset-password"); }}
                                                className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Please wait...
                                                    </>
                                                ) : (
                                                    "Verify"
                                                )}
                                            </Button>
                                            <button
                                                onClick={() => {
                                                    setOtpSent(false);
                                                    setTab("login");
                                                }}
                                                type="button"
                                                className="text-sm text-green-500 hover:underline block text-center w-full cursor-pointer"
                                            >
                                                Back to Login
                                            </button>
                                        </form>
                                    </Form>
                                </>
                            )}
                        </>
                    )}

                    {tab === "reset-password" && (
                        <>
                            <CardHeader className="p-0 mb-4">
                                <CardTitle>Reset Password</CardTitle>
                                <CardDescription>
                                    Enter the new password.
                                </CardDescription>
                            </CardHeader>
                            <Form {...resetPasswordForm}>
                                <form
                                    onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={resetPasswordForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="New password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={resetPasswordForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait...
                                            </>
                                        ) : (
                                            "Reset"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </>
                    )}

                    <Separator className="my-4" />
                    <p className="text-xs text-center text-muted-foreground">
                        By clicking, you agree to our{" "}
                        <span className="text-green-500">Terms & Conditions</span> and{" "}
                        <span className="text-green-500">Privacy Policy</span>.
                    </p>
                </CardContent>
            </Card>
        </section>
    );
};

export default BecomeSeller;