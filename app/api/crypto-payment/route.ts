import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TRONSCAN_URL = "https://tronscan.org/#/transaction";
const ETHERSCAN_URL = "https://etherscan.io/tx";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { txHash, network, email, amountUsdt, amountNgn, paymentRef, orderDetails, customerName } = body;

    if (!txHash?.trim()) {
      return NextResponse.json(
        { success: false, error: "Transaction hash is required" },
        { status: 400 }
      );
    }

    const explorerUrl =
      network === "trc20"
        ? `${TRONSCAN_URL}/${txHash.trim()}`
        : `${ETHERSCAN_URL}/${txHash.trim()}`;

    const notifyEmail = process.env.CRYPTO_PAYMENT_NOTIFY_EMAIL || "officialaprilfull@gmail.com";

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "AprilFull Tickets <onboarding@resend.dev>",
        to: [notifyEmail],
        subject: `[AprilFull] Crypto payment submitted – ${paymentRef || "No ref"}`,
        html: `
          <h2>New crypto payment submission</h2>
          <p><strong>Transaction hash:</strong> <a href="${explorerUrl}">${txHash.trim()}</a></p>
          <p><strong>Network:</strong> ${network === "trc20" ? "TRC20 (TRON)" : "ERC20 (Ethereum)"}</p>
          <p><strong>Customer:</strong> ${customerName || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Amount (USDT):</strong> ${amountUsdt || "N/A"}</p>
          <p><strong>Amount (NGN):</strong> ${amountNgn || "N/A"}</p>
          <p><strong>Payment reference:</strong> ${paymentRef || "N/A"}</p>
          <p><strong>Order details:</strong></p>
          <pre>${typeof orderDetails === "string" ? orderDetails : JSON.stringify(orderDetails, null, 2)}</pre>
          <p><a href="${explorerUrl}">Verify transaction on block explorer</a></p>
          <hr>
          <p style="color:#666;font-size:12px;">Submitted at ${new Date().toISOString()}</p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { success: false, error: "Failed to notify team" },
          { status: 500 }
        );
      }
    } else {
      // Log for development when Resend is not configured
      console.log("[Crypto payment submission]", {
        txHash: txHash.trim(),
        network,
        email,
        amountUsdt,
        amountNgn,
        paymentRef,
        orderDetails,
        explorerUrl,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your transaction has been submitted. The team will verify and send your tickets to your email.",
    });
  } catch (error) {
    console.error("Crypto payment submission error:", error);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
