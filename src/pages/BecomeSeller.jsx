// frontend/src/pages/BecomeSeller.jsx
import React, { useEffect, useState } from "react";
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../components/ui/input-otp.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form.jsx";
import { Separator } from "../components/ui/separator.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs.jsx";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { verifyAccountRegistrationSchema } from "../schemas/auth/verifyAccountRegistrationSchema.js";
import { forgotPasswordSchema } from "../schemas/auth/forgotPasswordSchema.js";
import { verifyAccountResetPasswordSchema } from "../schemas/auth/verifyAccountResetPasswordSchema.js";
import { resetPasswordSchema } from "../schemas/auth/resetPasswordSchema.js";
import LoginForm from "@/components/SellerLoginForm.jsx";
import SellerSignUpForm from "@/components/SellerSignUpForm.jsx";
import { useDispatch } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";
import { useGoogleLogin } from "@react-oauth/google";
import { loginSuccess } from "../redux/reducers/userSlice.js";
import { loginUserWithGoogle, registerUser, validateUsernameUnique, verifyAccountForRegistration } from "../api/Api.js";
import { FcGoogle } from "react-icons/fc";


const BecomeSeller = () => {
    const [tab, setTab] = useState("sign-up");
    const [otpSent, setOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const debounced = useDebounceCallback(setUsername, 300);

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage("");
                try {
                    const response = await validateUsernameUnique(username);
                    if (response.data.success) {
                        setUsernameMessage(response.data.message);
                    }
                }
                catch (error) {
                    setUsernameMessage(
                        error.response?.data.message || "Error checking username uniqueness!"
                    );
                }
                finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkUsernameUnique();
    }, [username]);

    const verifyAccountRegistrationForm = useForm({
        resolver: zodResolver(verifyAccountRegistrationSchema),
        defaultValues: {
            code: ""
        },
    });

    const forgotPasswordForm = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });

    const verifyAccountResetPasswordForm = useForm({
        resolver: zodResolver(verifyAccountResetPasswordSchema),
        defaultValues: {
            code: ""
        },
    });

    const resetPasswordForm = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    });

    const handleSignUp = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await registerUser(data);
            if (response.data.success) {
                toast.success("Sign Up Successful", {
                    description: response.data.message,
                });
                setTab("verify-otp-register");
            }
        }
        catch (error) {
            console.error("Error in sign up of user: ", error);
            toast.error("Error signing up the user", {
                description: error.response?.data.message,
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyAccountRegistration = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await verifyAccountForRegistration({
                username: username,
                code: data.code
            });

            if (response.data.success) {
                toast.success("Success", {
                    description: response.data.message,
                });
                setTab("login");
                // setOtpSent(false);
            }
        }
        catch (error) {
            console.error("Error verifying OTP for user registration: ", error);
            toast.error("Error verifying OTP for user registration", {
                description: error.response?.data.message,
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleLogin = (values) => {
        toast.success(`Logged in as ${values.identifier}`);
        navigate("/");
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await loginUserWithGoogle(tokenResponse.access_token);
                if (response.data.success) {
                    toast.success("Google Login Successful", {
                        description: response.data.message,
                    });
                    dispatch(loginSuccess(response.data));
                    navigate("/");
                }
            }
            catch (error) {
                console.error("Error in google login: ", error);
                toast.error("Error in google login", {
                    description: error.response?.data.message
                });
            }
        },
        onError: () => {
            toast.error("Google login failed");
        },
    });

    const handleForgotPassword = (values) => {
        toast.success(`OTP sent to ${values.email}`);
        setOtpSent(true);
    };

    const handleVerifyAccountResetPassword = (values) => {
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
                    {/* Sign Up and Login */}
                    {(tab === "sign-up" || tab === "login") && (
                        <Tabs value={tab} onValueChange={setTab}>
                            <TabsList className="grid grid-cols-2 mb-6 w-full">
                                <TabsTrigger value="sign-up">Sign up</TabsTrigger>
                                <TabsTrigger value="login">Login</TabsTrigger>
                            </TabsList>

                            {/* Signup */}
                            <TabsContent value="sign-up">
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
                                    username={username}
                                    usernameMessage={usernameMessage}
                                    isCheckingUsername={isCheckingUsername}
                                    debounced={debounced}
                                    showPassword={showPassword}
                                    togglePasswordVisibility={togglePasswordVisibility}
                                    showConfirmPassword={showConfirmPassword}
                                    toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                                    setTab={setTab}
                                />
                                <div className="mt-4 flex items-center justify-between">
                                    <hr className="w-full border-gray-300" />
                                    <span className="px-2 text-gray-400 text-sm">OR</span>
                                    <hr className="w-full border-gray-300" />
                                </div>

                                <div className="mt-4">
                                    <Button onClick={() => loginWithGoogle()}
                                        variant="outline" className="w-full font-semibold flex items-center gap-2"
                                    >
                                        <FcGoogle className="text-xl" />
                                        Continue with Google
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Login */}
                            <TabsContent value="login">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle>Login with Password</CardTitle>
                                    <CardDescription>
                                        Don’t have an account?{" "}
                                        <button
                                            onClick={() => setTab("sign-up")}
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

                                <div className="mt-4 flex items-center justify-between">
                                    <hr className="w-full border-gray-300" />
                                    <span className="px-2 text-gray-400 text-sm">OR</span>
                                    <hr className="w-full border-gray-300" />
                                </div>

                                <div className="mt-4">
                                    <Button onClick={() => loginWithGoogle()}
                                        variant="outline" className="w-full font-semibold flex items-center gap-2"
                                    >
                                        <FcGoogle className="text-xl" />
                                        Continue with Google
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}

                    {/* Verify (OTP) Account for Registration */}
                    {tab === "verify-otp-register" && (
                        <>
                            <CardHeader className="p-0 mb-4">
                                <CardTitle>Verify Your Account</CardTitle>
                                <CardDescription>
                                    Enter the OTP for account registration.
                                </CardDescription>
                            </CardHeader>
                            <Form {...verifyAccountRegistrationForm}>
                                <form
                                    onSubmit={verifyAccountRegistrationForm.handleSubmit(handleVerifyAccountRegistration)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={verifyAccountRegistrationForm.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>OTP</FormLabel>
                                                <FormControl>
                                                    <div className="flex justify-center">
                                                        <InputOTP
                                                            maxLength={6}
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        >
                                                            <InputOTPGroup>
                                                                {[...Array(6)].map(
                                                                    (_, i) => (
                                                                        <InputOTPSlot
                                                                            key={i}
                                                                            index={i}
                                                                        />
                                                                    )
                                                                )}
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold mt-4"
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
                                            setTab("sign-up");
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

                    {/* Forgot Password */}
                    {tab === "forgot-password" && (
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
                                        // Delete it later
                                        onClick={() => { setTab("verify-otp-reset"); }}
                                        className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold mt-4"
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
                    )}

                    {/* Verify (OTP) Account for Reset Password */}
                    {tab === "verify-otp-reset" && (
                        <>
                            <CardHeader className="p-0 mb-4">
                                <CardTitle>Verify OTP</CardTitle>
                                <CardDescription>
                                    Enter the OTP for reset password.
                                </CardDescription>
                            </CardHeader>
                            <Form {...verifyAccountResetPasswordForm}>
                                <form
                                    onSubmit={verifyAccountResetPasswordForm.handleSubmit(handleVerifyAccountResetPassword)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={verifyAccountResetPasswordForm.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>OTP</FormLabel>
                                                <FormControl>
                                                    <div className="flex justify-center">
                                                        <InputOTP
                                                            maxLength={6}
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        >
                                                            <InputOTPGroup>
                                                                {[...Array(6)].map(
                                                                    (_, i) => (
                                                                        <InputOTPSlot
                                                                            key={i}
                                                                            index={i}
                                                                        />
                                                                    )
                                                                )}
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        // Delete it later
                                        onClick={() => { setTab("reset-password"); }}
                                        className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold mt-4"
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
                                        className="w-full bg-green-500 hover:bg-green-600 text-gray-200 font-semibold mt-4"
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