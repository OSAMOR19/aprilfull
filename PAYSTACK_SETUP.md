# Paystack & Crypto Payment Setup Guide

This guide explains how to configure Paystack and crypto payments for the AprilFull tickets page.

## Paystack Setup

### 1. Create a Paystack Account

1. Go to [Paystack](https://paystack.com) and sign up
2. Complete your account verification
3. Navigate to **Settings** → **API Keys & Webhooks** in your [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer)

### 2. Get Your API Keys

- **Test keys** (for development): Use `pk_test_...` and `sk_test_...`
- **Live keys** (for production): Use `pk_live_...` and `sk_live_...`

⚠️ **Never expose your Secret Key** – it must only be used on the server.

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
# Paystack - Get from https://dashboard.paystack.com/#/settings/developer
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here

# Crypto (optional)
NEXT_PUBLIC_USDT_TRC20_ADDRESS=your_usdt_trc20_wallet_address
NEXT_PUBLIC_USDT_ERC20_ADDRESS=your_usdt_erc20_wallet_address
```

### 4. How It Works

- **Frontend**: Uses `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` to open the Paystack payment popup (card, bank transfer, USSD, etc.)
- **Backend**: The `/api/paystack/verify` route uses `PAYSTACK_SECRET_KEY` to verify transactions after payment
- Transactions are only confirmed after server-side verification

### 5. Testing

With test keys, you can use Paystack’s [test cards](https://paystack.com/docs/payments/test-payments):
- **Success**: `5060 6666 6666 6666 666`
- **Declined**: `5060 0000 0000 0000 00`
- Use any future expiry date and any 3-digit CVV

---

## Crypto Payment Setup

### 1. Get Wallet Addresses

Add your USDT wallet addresses (TRC20 and/or ERC20) to `.env.local`:

```
NEXT_PUBLIC_USDT_TRC20_ADDRESS=your_trc20_address
NEXT_PUBLIC_USDT_ERC20_ADDRESS=your_erc20_address
```

### 2. NGN to USD Rate

The crypto amount is computed using `NGN_TO_USD_RATE` in `TicketBooking.tsx` (default: 1650). Update this for accurate conversion.

### 3. Payment Flow

1. User selects “Crypto” as payment method
2. They see the USDT amount, wallet address(es), and a unique payment reference
3. User sends USDT and includes the reference in the memo
4. You match payments manually and send tickets to the user’s email

---

## Production Checklist

- [ ] Switch to live Paystack keys
- [ ] Set up [Paystack Webhooks](https://paystack.com/docs/payments/webhooks) for reliable payment notifications
- [ ] Persist successful payments (e.g. database) when using the verify API
- [ ] Update crypto wallet addresses with real addresses
- [ ] Review and adjust `NGN_TO_USD_RATE` as needed
