// frontend/src/components/buyer/BidDialog.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog.jsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bidSchema } from './../../schemas/bidSchema.js';


const BidDialog = ({ open, onOpenChange, product, onPlaceBid }) => {
    const [placing, setPlacing] = useState(false);

    const form = useForm({
        resolver: zodResolver(bidSchema),
        defaultValues: {
            bidAmount: 0,
            quantity: 1,
        },
    });

    // Compute total dynamically
    const bidAmount = Number(form.watch("bidAmount")) || 0;
    const quantity = Number(form.watch("quantity")) || 1;
    const total = useMemo(() => {
        return bidAmount * quantity;
    }, [bidAmount, quantity]);


    const handlePlaceBid = async (data) => {
        if (!product) return;

        const bidAmount = Number(data.bidAmount);
        const quantity = Number(data.quantity);
        const current = Number(product.currentBid) / 100;

        if (bidAmount <= current) {
            return toast.error(`Your bid must be greater than current bid (₹${current.toFixed(2)})`);
        }

        setPlacing(true);
        try {
            // Simulate API
            await new Promise((r) => setTimeout(r, 800));

            toast.success("Bid placed successfully!");

            onOpenChange(false);
        }
        catch (error) {
            toast.error(error.message || "Failed to place bid");
        }
        finally {
            setPlacing(false);
        }
    };

    const formatAmount = (amount) => {
        const format = Number(amount).toLocaleString("en-IN", {
            minimumFractionDigits: 2
        });
        return `Rs. ${format}`;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0 rounded-lg">
                <DialogHeader className="border-b px-6 py-4">
                    <DialogTitle>Place a Bid</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4 mb-2">
                    {/* Left: Product Description */}
                    <div className="space-y-4">
                        <div className="w-full h-44 rounded-md overflow-hidden bg-gray-100">
                            <img
                                src={product?.image}
                                alt={product?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">{product?.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                by{" "}
                                <span className="font-medium">
                                    {product?.seller?.name}
                                </span>
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Current bid:{" "}
                                <span className="font-semibold">
                                    {formatAmount(product?.currentBid)}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Bid Form */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handlePlaceBid)}
                            className="space-y-4"
                        >
                            <div>
                                <FormField
                                    control={form.control}
                                    name="bidAmount"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel>Your bid (GBP)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="5"
                                                    min="0"
                                                    placeholder={(
                                                        (product?.currentBid || 0) + 1
                                                    ).toFixed(2)}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel>
                                                Quantity ({product?.quantityAvailable ?? 1} available)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={product?.quantityAvailable ?? 1}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Summary */}
                                <div className="mt-6 bg-gray-50 p-4 rounded">
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <div>Your bid</div>
                                        <div>
                                            {form.watch("bidAmount")
                                                ? `${formatAmount(form.watch("bidAmount"))}`
                                                : "—"}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                        <div>Service fee (5%)</div>
                                        <div>
                                            {form.watch("bidAmount")
                                                ? `${(
                                                    formatAmount(form.watch("bidAmount") * 0.05)
                                                )}`
                                                : "—"}
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-semibold mt-2">
                                        <div>You will pay</div>
                                        <div>
                                            {form.watch("bidAmount")
                                                ? `${formatAmount(total + (form.watch("bidAmount") * 0.5))}`
                                                : "—"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="w-full flex flex-row gap-3 md:col-span-2">
                                <Button type="submit" className="flex-1" disabled={placing}>
                                    {placing ? "Placing…" : "Place a bid"}
                                </Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => onOpenChange(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BidDialog;