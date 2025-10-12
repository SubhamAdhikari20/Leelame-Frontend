// frontend/src/pages/UserProfile.jsx
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog.jsx";
import { Input } from "../components/ui/input.jsx";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx";
import { useForm } from "react-hook-form";
import { updateUserDetailsSchema } from "../schemas/updateUserDetailsSchema.js";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editUserDetails, deleteUser, validateUsernameUnique, fetchCurrentUser, uploadProfilePicture } from "../api/Api.js";
import { logout, updateUserDetails } from "../redux/reducers/userSlice.js";


const UserProfile = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [preview, setPreview] = useState("");
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameMessgae, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const debounced = useDebounceCallback(setUsername, 300);

    const getCurrentUser = async () => {
        try {
            const response = await fetchCurrentUser();
            // console.log("User data:", res.data.user);
            dispatch(updateUserDetails(response.data));
        }
        catch (error) {
            console.error("Failed to fetch user:", error);
            // dispatch(logout());
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const form = useForm({
        resolver: zodResolver(updateUserDetailsSchema),
        defaultValues: {
            fullName: currentUser?.fullName || "",
            username: currentUser?.username || "",
            email: currentUser?.email || "",
            contact: currentUser?.contact || "",
        }
    });

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
                    setUsernameMessage(error.response?.data.message || "Error checking username!");
                }
                finally {
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUsernameUnique();
    }, [username]);

    const onImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            // const url = URL.createObjectURL(file);
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await editUserDetails(currentUser._id, data);

            toast('Success', {
                description: response.data.message
            });
            await fetchCurrentUser();

            if (response.data.user?.username !== currentUser?.username) {
                dispatch(logout());
                navigate(`/verify-account-registration/${response.data.user?.username}`);
            }
        }
        catch (error) {
            console.error("Error in sign up of user", error);
            let errorMessage = error.response?.data.message;
            toast('Sign Up failed', {
                description: errorMessage
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleClear = () => {
        form.reset({
            fullName: "",
            username: "",
            email: "",
            contact: "",
        });
    };

    // Handle delete
    const handleDelete = async (userId) => {
        try {
            const response = await deleteUser(userId);
            toast.success(response.data.message);
            signOut();
        }
        catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile) {
            toast.error("Please select an image before uploading.");
            return;
        }

        setIsUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append("profilePicture", selectedFile);

            const response = await uploadProfilePicture(formData);
            toast.success(response.data.message || "Profile picture updated successfully!");

            await getCurrentUser();
            setPreview("");
            setSelectedFile(null);
        }
        catch (error) {
            // console.error("Image upload failed", error);
            toast.error(`Image upload failed: ${error.response?.data.message || "Unknown error"}`);
        }
        finally {
            setIsUploadingImage(false);
        }
    }

    return (
        <section className="w-full xl:max-w-7xl bg-[#d3ecdc] rounded-xl shadow-lg p-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-5">My Profile</h1>
            <div className="flex flex-col xl:flex-row xl:justify-evenly gap-4 justify-center">
                <div className="flex flex-col justify-center items-center gap-4">
                    <Avatar className="h-30 w-30 lg:h-45 lg:w-45 border-2 border-gray-900">
                        <AvatarImage
                            src={preview ? preview : (currentUser?.profilePictureUrl || undefined)}
                            alt={currentUser?.fullName || currentUser?.username || "Owner"}
                        />
                        <AvatarFallback className="text-6xl font-semibold text-gray-700">
                            {(currentUser?.fullName || currentUser?.username || "O")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="flex flex-row! items-center gap-2">
                            <Button
                                type="button"
                                className="bg-gray-400 hover:bg-gray-500"
                                disabled={isUploadingImage}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Change Profile Picture
                            </Button>

                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={onImageChange}
                                className="hidden"
                                disabled={isUploadingImage}
                            />

                            {(preview && selectedFile) && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    disabled={isUploadingImage}
                                    onClick={() => {
                                        setSelectedFile(null);
                                        setPreview(currentUser?.profilePictureUrl || "");
                                    }}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>

                        <Button
                            variant="outline"
                            className="text-sm text-gray-500"
                            onClick={handleUploadImage}
                            disabled={!selectedFile || isUploadingImage}
                        >
                            {selectedFile ? (isUploadingImage ? (
                                <>
                                    Please wait...
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Upload Image
                                </>
                            )
                            ) : <>Select Image to Upload</>}
                        </Button>
                    </div>

                    <div className="mt-auto xl:w-full">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type="button" variant="destructive" className="w-full">
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the user account
                                        <strong> "{currentUser?.fullName}"</strong> and remove their data from the system.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(Number(currentUser?.id))}>
                                        Confirm Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                <div className="w-full flex-1 max-w-2xl xl:max-w-xl space-y-8 bg-white p-8 rounded-lg shadow-lg">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="fullName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full Name" {...field}
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
                                                placeholder="Username" {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    debounced(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                                        <p className={`text-sm ${usernameMessgae === "Username is available" ? "text-green-500" : "text-red-500"}`}>
                                            {usernameMessgae}
                                        </p>
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
                                                placeholder="Email" {...field}
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
                                        <FormLabel>Contact</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contact" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-evenly gap-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                                >
                                    {isSubmitting ? (
                                        <>
                                            Please wait...
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Update Details
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    className="flex-1 text-cyan-600 border-cyan-600 hover:bg-cyan-50"
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;