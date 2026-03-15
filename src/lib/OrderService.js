import { apiService } from "@/lib/api";

const ORDERS_ENDPOINT = "/Dashboard/customer-orders";

/**
 * Fetch the current user customer orders.
 * GET /api/Dashboard/customer-orders
 */
export async function getCustomerOrders() {
    return apiService.get(ORDERS_ENDPOINT);
}

/**
 * Fetch details of a specific order by ID.
 * GET /api/Dashboard/order/{orderId}
 */
export async function getOrderDetails(orderId) {
    return apiService.get(`/Dashboard/order/${orderId}`);
}
