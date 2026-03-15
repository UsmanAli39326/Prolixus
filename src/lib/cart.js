/**
 * Shared pricing calculation utility.
 * All price-displaying components (Cart, OrderSummary, payload builder)
 * must import from here to guarantee consistent numbers site-wide.
 */

/**
 * Derives all cart totals from a list of cart items.
 * VAT is calculated per item using the vatPercentage from the API
 * (provided as a decimal, e.g. 0.06 = 6%).
 *
 * @param {Array} cartItems  – items from CartContext ({ price,   quantity, vatPercentage, … })
 * @returns {{ subtotal, vatAmount, shipping, total, vatPercentage }}
 */
/**
 * Normalizes a VAT rate from the API into a decimal multiplier.
 * The API is inconsistent: sometimes it sends 0.05 (decimal) and
 * sometimes 19 (whole percentage). This function always returns
 * the decimal form (e.g. 0.05 or 0.19).
 */
function normalizeVatRate(raw) {
    const v = raw ?? 0;
    if (v === 0) return 0;
    // If the value is >= 1 it's already a whole percentage (e.g. 19 → 0.19)
    return v >= 1 ? v / 100 : v;
}

export function calcCartTotals(cartItems = []) {
    const r = (n) => parseFloat((n ?? 0).toFixed(2));

    const subtotal = r(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));

    // Calculate VAT per item using the normalized rate
    const vatAmount = r(
        cartItems.reduce((sum, item) => {
            const rate = normalizeVatRate(item.vatPercentage);
            return sum + item.price * item.quantity * rate;
        }, 0)
    );

    // Collect all unique VAT percentages (as whole numbers)
    const allVatPercentages = [...new Set(
        cartItems.map(item => r(normalizeVatRate(item.vatPercentage) * 100))
    )].sort((a, b) => a - b);

    // Combined VAT percentage (sum of unique percentages as per user request)
    const combinedVatPercentage = allVatPercentages.reduce((sum, p) => sum + p, 0);

    // Derive a display-friendly VAT percentage (keep for backward compatibility)
    const vatPercentage = allVatPercentages.length > 0 ? allVatPercentages[0] : 0;

    const shipping = 0; // Shipping is always free
    const total = r(subtotal + vatAmount + shipping);

    return {
        subtotal,
        vatAmount,
        shipping,
        total,
        vatPercentage,
        allVatPercentages,
        combinedVatPercentage,
    };
}
