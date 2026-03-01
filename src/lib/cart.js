/**
 * Shared pricing constants and calculation utility.
 * All price-displaying components (Cart, OrderSummary, payload builder)
 * must import from here to guarantee consistent numbers site-wide.
 */

export const PRICING = {
    VAT_PERCENTAGE: 19,              // VAT shown to the customer (%)
    FREE_SHIPPING_THRESHOLD: 100,    // Order subtotal above which shipping is free ($)
    SHIPPING_COST: 9.99,             // Flat shipping fee when below threshold ($)
};

/**
 * Derives all cart totals from a list of cart items.
 * @param {Array} cartItems  – items from CartContext ({ price, quantity, … })
 * @returns {{ subtotal, vatAmount, shipping, total, vatPercentage }}
 */
export function calcCartTotals(cartItems = []) {
    const r = (n) => parseFloat((n ?? 0).toFixed(2));

    const subtotal = r(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    const vatAmount = r(subtotal * (PRICING.VAT_PERCENTAGE / 100));
    const shipping = subtotal >= PRICING.FREE_SHIPPING_THRESHOLD ? 0 : PRICING.SHIPPING_COST;
    const total = r(subtotal + vatAmount + shipping);

    return {
        subtotal,
        vatAmount,
        shipping,
        total,
        vatPercentage: PRICING.VAT_PERCENTAGE,
    };
}
