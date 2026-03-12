import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Reference is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "Paystack is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { success: false, error: data.message || "Verification failed" },
        { status: 400 }
      );
    }

    if (data.data?.status !== "success") {
      return NextResponse.json(
        { success: false, error: "Transaction not successful" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        reference: data.data.reference,
        amount: data.data.amount,
        email: data.data.customer?.email,
        metadata: data.data.metadata,
      },
    });
  } catch (error) {
    console.error("Paystack verification error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
