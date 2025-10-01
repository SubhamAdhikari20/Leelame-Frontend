// frontend/src/auth/SignUp.jsx
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { signUpSchema } from "../schemas/auth/signUpSchema.js";
import { AxiosError } from "axios";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form.jsx";
import { Checkbox } from "../components/ui/checkbox.jsx";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUserWithGoogle, registerUser, validateUsernameUnique } from "@/api/Api.js";
import { FcGoogle } from "react-icons/fc";
import { loginSuccess } from "@/redux/reducers/userSlice.js";
import { useGoogleLogin } from "@react-oauth/google";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [usernameMessgae, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const debounced = useDebounceCallback(setUsername, 300);

    // zod implementation
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
            role: "buyer",
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword((prev) => !prev);

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage("");
                try {
                    const response = await validateUsernameUnique(username);
                    setUsernameMessage(response.data.message);
                }
                catch (error) {
                    setUsernameMessage(
                        error.response.data.message ||
                        "Error checking username!"
                    );
                }
                finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await registerUser(data);
            toast.success("Success", {
                description: response.data.message,
            });

            navigate(`/verify-account-registration/${username}`);
        }
        catch (error) {
            console.error("Error in sign up of user", error);
            toast.error("Sign Up failed", {
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

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 px-5 py-10 sm:px-6 lg:px-8">
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
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Leelame
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Sign up to start your bidding adventure
                        </p>
                    </div>
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <FormField
                                    name="fullName"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Full Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                            {isCheckingUsername && (
                                                <Loader2 className="animate-spin" />
                                            )}
                                            <p
                                                className={`text-sm ${usernameMessgae ===
                                                    "Username is available"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                                    }`}
                                            >
                                                {usernameMessgae}
                                            </p>
                                            {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="contact"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contact"
                                                    {...field}
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
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    {...field}
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
                                                    />
                                                </FormControl>
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
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
                                <FormField
                                    name="confirmPassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Confirm Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <button
                                                    type="button"
                                                    onClick={
                                                        toggleConfirmPasswordVisibility
                                                    }
                                                    className="cursor-pointer absolute inset-y-0 end-2.5 z-20 text-gray-400  focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                                                >
                                                    {showConfirmPassword ? (
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
                                                <div className="space-y-1 leading-none">
                                                    <Label
                                                        htmlFor="terms"
                                                        className="cursor-pointer"
                                                    >
                                                        I accept all the terms and
                                                        conditions
                                                    </Label>
                                                </div>
                                            </div>
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
                                                Please wait
                                            </>
                                        ) : (
                                            "Sign up"
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
                        <div className="text-center mt-4">
                            <p className="text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;