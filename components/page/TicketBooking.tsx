"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Coins,
  Copy,
  Check,
} from "lucide-react";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        ref: string;
        currency?: string;
        metadata?: Record<string, unknown>;
        onClose?: () => void;
        callback?: (response: { reference: string }) => void;
      }) => { iframeHolder: () => void };
    };
  }
}

// Approximate NGN to USD rate for crypto display (update as needed)
const NGN_TO_USD_RATE = 1650;
const USDT_TRC20 = process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS || "";
const USDT_ERC20 = process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS || "";

export type TicketType = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const TICKET_TYPES: TicketType[] = [
  {
    id: "regular",
    name: "REGULAR",
    description: "General admission",
    price: 5000,
  },
  {
    id: "vip",
    name: "VIP",
    description: "Premium access with exclusive perks",
    price: 80000,
  },
  {
    id: "premium",
    name: "PREMIUM",
    description: "VIP experience with meet & greet",
    price: 400000,
  },
  {
    id: "sofa-lounge",
    name: "SOFA LOUNGE",
    description: "Luxury lounge access",
    price: 800000,
  },
];

function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

type BillingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function TicketBooking() {
  const [step, setStep] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(TICKET_TYPES.map((t) => [t.id, 0]))
  );
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "paystack" | "crypto" | null
  >(null);
  const [isPaying, setIsPaying] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [txHash, setTxHash] = useState("");
  const [cryptoNetwork, setCryptoNetwork] = useState<"trc20" | "erc20">("trc20");
  const [cryptoSubmitStatus, setCryptoSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [cryptoOrderRef] = useState(
    () => `APRILFULL-${Date.now().toString(36).toUpperCase()}`
  );

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalAmount = TICKET_TYPES.reduce(
    (sum, t) => sum + quantities[t.id] * t.price,
    0
  );

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, (prev[ticketId] ?? 0) + delta),
    }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const resetOrder = () => {
    setStep(1);
    setPaymentMethod(null);
    setQuantities(Object.fromEntries(TICKET_TYPES.map((t) => [t.id, 0])));
    setBillingInfo({ firstName: "", lastName: "", email: "", phone: "" });
    setTxHash("");
    setCryptoSubmitStatus("idle");
  };

  const handlePaystackPayment = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      alert("Paystack is not configured. Please add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to your environment.");
      return;
    }
    if (!window.PaystackPop) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }
    setIsPaying(true);
    const ref = `APRILFULL-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: billingInfo.email,
      amount: totalAmount * 100,
      ref,
      currency: "NGN",
      metadata: {
        custom_fields: [
          { display_name: "First Name", variable_name: "first_name", value: billingInfo.firstName },
          { display_name: "Last Name", variable_name: "last_name", value: billingInfo.lastName },
          { display_name: "Phone", variable_name: "phone", value: billingInfo.phone },
          { display_name: "Tickets", variable_name: "tickets", value: JSON.stringify(quantities) },
        ],
      },
      callback: async (response) => {
        try {
          const res = await fetch("/api/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference }),
          });
          const data = await res.json();
          if (data.success) {
            alert("Payment successful! Your tickets will be sent to " + billingInfo.email);
            resetOrder();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        } catch {
          alert("Payment verification failed. Please contact support.");
        } finally {
          setIsPaying(false);
        }
      },
      onClose: () => setIsPaying(false),
    });
    handler.iframeHolder();
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      alert("Failed to copy");
    }
  };

  const handleCryptoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim()) return;
    setCryptoSubmitStatus("loading");
    try {
      const res = await fetch("/api/crypto-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: txHash.trim(),
          network: cryptoNetwork,
          email: billingInfo.email,
          amountUsdt: usdtAmount,
          amountNgn: formatPrice(totalAmount),
          paymentRef: cryptoOrderRef,
          orderDetails: TICKET_TYPES.filter((t) => quantities[t.id] > 0).map(
            (t) => `${t.name} × ${quantities[t.id]}`
          ),
          customerName: `${billingInfo.firstName} ${billingInfo.lastName}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCryptoSubmitStatus("success");
        setTxHash("");
      } else {
        setCryptoSubmitStatus("error");
      }
    } catch {
      setCryptoSubmitStatus("error");
    }
  };

  const canProceedToBilling = totalTickets > 0;
  const paystackReady = !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const usdtAmount = (totalAmount / NGN_TO_USD_RATE).toFixed(2);
  const steps = [
    { num: 1, label: "Select ticket" },
    { num: 2, label: "Billing information" },
    { num: 3, label: "Payment" },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 bg-[#F8F8F8] dark:bg-gray-950">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Book Your Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Secure your spot at AprilFull
        </p>

        {/* Step indicators */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${
                step >= s.num ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= s.num
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {s.num}
              </span>
              <span className="hidden sm:inline font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-4">
                {TICKET_TYPES.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{ticket.name}</CardTitle>
                      <CardDescription>{ticket.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {formatPrice(ticket.price)}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(ticket.id, -1)
                          }
                          disabled={quantities[ticket.id] === 0}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-12 text-center text-lg font-semibold">
                          {quantities[ticket.id]}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(ticket.id, 1)
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-purple-500 transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing information</CardTitle>
                  <CardDescription>
                    Enter your details for the ticket confirmation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleBillingSubmit}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={billingInfo.firstName}
                          onChange={handleBillingChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={billingInfo.lastName}
                          onChange={handleBillingChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={billingInfo.email}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleBillingChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                        placeholder="(234) 123 456 7890"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft size={18} />
                        Back
                      </Button>
                      <Button type="submit" className="flex items-center gap-1">
                        Continue to Payment
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>
                    Choose your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment method selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paystack")}
                      className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === "paystack"
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-purple-400"
                      }`}
                    >
                      <CreditCard size={24} className="text-purple-600" />
                      <span className="font-medium">Paystack</span>
                      <span className="text-sm text-gray-500">Card, Bank Transfer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("crypto")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === "crypto"
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-purple-400"
                      }`}
                    >
                      <Coins size={24} className="text-purple-600" />
                      <span className="font-medium">Crypto</span>
                      <span className="text-sm text-gray-500">USDT (TRC20/ERC20)</span>
                    </button>
                  </div>

                  {/* Paystack payment */}
                  {paymentMethod === "paystack" && (
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay securely with your card or bank account via Paystack.
                      </p>
                      <Button
                        onClick={handlePaystackPayment}
                        disabled={isPaying || !paystackReady}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        {isPaying ? "Processing..." : "Pay with Paystack"}
                      </Button>
                    </div>
                  )}

                  {/* Crypto payment */}
                  {paymentMethod === "crypto" && (
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Send <strong>USDT {usdtAmount}</strong> (≈ {formatPrice(totalAmount)} NGN) to one of the addresses below. Include the payment reference in the memo.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-500 block mb-1">Payment Reference (include in memo)</label>
                          <div className="flex gap-2">
                            <code className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm truncate">{cryptoOrderRef}</code>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(cryptoOrderRef, "ref")}
                              className="shrink-0"
                            >
                              {copiedField === "ref" ? <Check size={16} /> : <Copy size={16} />}
                            </Button>
                          </div>
                        </div>
                        {USDT_TRC20 && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 block mb-1">USDT (TRC20)</label>
                            <div className="flex gap-2">
                              <code className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm truncate">{USDT_TRC20}</code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(USDT_TRC20, "trc20")}
                                className="shrink-0"
                              >
                                {copiedField === "trc20" ? <Check size={16} /> : <Copy size={16} />}
                              </Button>
                            </div>
                          </div>
                        )}
                        {USDT_ERC20 && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 block mb-1">USDT (ERC20)</label>
                            <div className="flex gap-2">
                              <code className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm truncate">{USDT_ERC20}</code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(USDT_ERC20, "erc20")}
                                className="shrink-0"
                              >
                                {copiedField === "erc20" ? <Check size={16} /> : <Copy size={16} />}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Transaction hash submission - confirm payment */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Already sent payment? Submit your transaction hash for confirmation
                        </p>
                        <form onSubmit={handleCryptoSubmit} className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Network used
                            </label>
                            <select
                              value={cryptoNetwork}
                              onChange={(e) =>
                                setCryptoNetwork(e.target.value as "trc20" | "erc20")
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm"
                            >
                              <option value="trc20">TRC20 (TRON)</option>
                              <option value="erc20">ERC20 (Ethereum)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Transaction hash (paste from your wallet)
                            </label>
                            <input
                              type="text"
                              value={txHash}
                              onChange={(e) => setTxHash(e.target.value)}
                              placeholder="e.g. 0x123... or abc123..."
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm font-mono"
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={
                              !txHash.trim() || cryptoSubmitStatus === "loading"
                            }
                            className="w-full"
                          >
                            {cryptoSubmitStatus === "loading"
                              ? "Submitting..."
                              : cryptoSubmitStatus === "success"
                                ? "Submitted"
                                : "Submit for confirmation"}
                          </Button>
                          {cryptoSubmitStatus === "success" && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Thank you! Your transaction has been submitted. The team will verify and send your tickets to {billingInfo.email} within 24 hours.
                            </p>
                          )}
                          {cryptoSubmitStatus === "error" && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                              Something went wrong. Please try again or contact us at officialaprilfull@gmail.com
                            </p>
                          )}
                        </form>
                      </div>

                      <p className="text-xs text-gray-500">
                        After payment, tickets will be sent to <strong>{billingInfo.email}</strong>. Contact us if you don&apos;t receive them within 24 hours.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => { setStep(2); setPaymentMethod(null); setTxHash(""); setCryptoSubmitStatus("idle"); }}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft size={18} />
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {TICKET_TYPES.filter((t) => quantities[t.id] > 0).map(
                  (ticket) => (
                    <div
                      key={ticket.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {ticket.name} × {quantities[ticket.id]}
                      </span>
                      <span className="font-medium">
                        {formatPrice(
                          quantities[ticket.id] * ticket.price
                        )}
                      </span>
                    </div>
                  )
                )}
                {totalTickets === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No tickets selected
                  </p>
                )}
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-purple-600 dark:text-purple-400">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                {step === 1 && (
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedToBilling}
                    className="w-full mt-4"
                  >
                    Continue to Billing
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
