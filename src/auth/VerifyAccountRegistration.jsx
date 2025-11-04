// frontend/src/auth/VerifyAccountRegistration.jsx
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form.jsx";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../components/ui/input-otp.jsx";
import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccountRegistrationSchema } from "./../schemas/auth/verifyAccountRegistrationSchema.js";
import { verifyAccountForRegistration } from "../api/Api.js";
import { Loader2 } from "lucide-react";


const VerifyAccountRegistration = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isVerifying, setIsVerifying] = useState(false);

    const form = useForm({
        resolver: zodResolver(verifyAccountRegistrationSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data) => {
        setIsVerifying(true);
        try {
            const response = await verifyAccountForRegistration({
                username: params.username,
                code: data.code
            });

            if (response.data.success) {
                toast.success("Success", {
                    description: response.data.message,
                });
                navigate("/login");
            }
        }
        catch (error) {
            console.error("Error verifying OTP for user registration: ", error);
            toast.error("Error verifying OTP for user registration", {
                description: error.response?.data.message,
            });
        }
        finally {
            setIsVerifying(false);
        }
    };
    return (
        <section className="flex justify-center items-center px-5 py-20 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 border rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
                        Verify Your Account
                    </h1>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Enter the verification code sent to your email for account registration
                    </p>
                </div>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center mb-6">
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
                            <div className="flex items-center justify-center">
                                <Button
                                    type="submit"
                                    className="w-full font-semibold"
                                    disabled={isVerifying}
                                >
                                    {isVerifying ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default VerifyAccountRegistration;