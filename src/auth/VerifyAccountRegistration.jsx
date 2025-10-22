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
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
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
        <section className="flex justify-center items-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 border rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                        Verify Your Account
                    </h1>
                    <p className="mb-6">
                        Enter the verification code sent to your email
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
                                            <Input
                                                placeholder="Enter the code"
                                                {...field}
                                            />
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