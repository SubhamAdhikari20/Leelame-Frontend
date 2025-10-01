// frontend/src/auth/Login.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form.jsx";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../components/ui/dialog.jsx";
import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import { Label } from "../components/ui/label.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema } from "../schemas/auth/loginSchema.js";
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google';
import { loginUser, loginUserWithGoogle, sendVerificationEmailForRegistration } from "../api/Api.js";
import { loginSuccess, logout } from "../redux/reducers/userSlice.js";


const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    // OTP dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState("");
    const [iSendingCode, setIsSendingCode] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
    });

    // State to control password visibility
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    // Login
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await loginUser(data);
            const user = response.data.user;

            if (user.isVerified) {
                toast.success("Login Successful", {
                    description: response.data.message,
                });
                dispatch(loginSuccess(response.data));
                navigate(`/`);
                return;
            }
            else {
                toast.warning("Account Not Verified", {
                    description:
                        "Please verify your email to access your account.",
                    action: {
                        label: "Yes",
                        onClick: () => {
                            setEmailToVerify(user.email);
                            setDialogOpen(true);
                        },
                    },
                });
                return;
            }
        }
        catch (error) {
            toast.error("Login failed", {
                description: error.response.data.message,
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { data } = await loginUserWithGoogle(tokenResponse.access_token);
                toast.success("Logged in successfully");

                dispatch(loginSuccess(data));
                navigate("/dashboard");
            }
            catch (error) {
                console.error("Google Login Error:", error);
                toast.error("Google login failed");
            }
        },
        onError: () => {
            toast.error("Google login failed");
        },
    });

    const sendAccountVerificationCode = async () => {
        setIsSendingCode(true);
        try {
            const response = await sendVerificationEmailForRegistration(
                emailToVerify
            );
            toast.success(response.data.message);
            navigate(`/verify-account-registration/${response.data.user.username}`);
        }
        catch (error) {
            toast.error(error.response?.data.message || "Failed to send code");
        }
        finally {
            setIsSendingCode(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-5 py-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                <Button
                    variant="ghost"
                    className="relative top-2 left-2 text-gray-600 hover:text-blue-950"
                    onClick={() => navigate("/")}
                    aria-label="Back to home"
                >
                    <ArrowLeft size={24} />
                </Button>

                <div className="space-y-8 px-8 pb-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
                            Leelame
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Login to start your bidding adventure
                        </p>
                    </div>
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="mt-8 space-y-6"
                            >
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
                                                    className="cursor-pointer absolute inset-y-0 end-2.5 z-20 text-gray-400  focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
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
                                    <Link
                                        to="/forgot-password"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full font-semibold"
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
                                </div>
                            </form>
                        </Form>
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

                        <div className="text-center mt-5">
                            <p className="text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/sign-up"
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── VERIFY DIALOG ───────────────────────────────────── */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify Your Email</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label className="mb-2">Email</Label>
                            <Input
                                value={emailToVerify}
                                onChange={(e) =>
                                    setEmailToVerify(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={sendAccountVerificationCode}
                                disabled={iSendingCode}
                                className="flex-1 font-semibold"
                            >
                                {iSendingCode && (
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                )}
                                Send Code
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default Login;