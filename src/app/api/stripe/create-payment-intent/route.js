import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  const { amount, currency } = await req.json();

  try {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }


    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parsedAmount * 100),
      currency: currency || "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        integration: "nextjs_checkout",
      },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}