import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" };

// createSlice is used for global state management
/**
 * Cart slice to manage cart state with Redux Toolkit.
 * Defines cart reducer with initial state and reducers to
 * handle add/remove items, update shipping/payment info, clear cart.
 * Exports reducer and action creators.
 */
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		/**
		 * Updates the cart items based on the provided action payload.
		 *
		 * @param {Object} state - The current state of the cart
		 * @param {Object} action - The action object containing the payload
		 * @return {Object} The updated state of the cart
		 */
		addToCart: (state, action) => {
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x._id === item._id);
			if (existItem) {
				state.cartItems = state.cartItems.map((x) =>
					x._id === existItem._id ? item : x,
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}
			return updateCart(state);
		},
		/**
		 * Removes an item from the cart and updates the cart state.
		 *
		 * @param {Object} state - The current state of the cart.
		 * @param {Object} action - The action containing the payload to remove from the cart.
		 * @return {Object} The updated cart state.
		 */
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
			return updateCart(state);
		},
		/**
		 * Updates the shipping address in the state and returns the updated cart.
		 *
		 * @param {Object} state - The current state object
		 * @param {Object} action - The action object containing the payload
		 * @return {Object} The updated cart
		 */
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			return updateCart(state);
		},
		/**
		 * Saves the payment method to the state and updates the cart.
		 *
		 * @param {Object} state - The current state
		 * @param {Object} action - The action containing the payment method payload
		 * @return {Object} The updated state after saving the payment method and updating the cart
		 */
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			return updateCart(state);
		},
		/**
		 * Clears the cart items in the state and updates the cart.
		 *
		 * @param {object} state - the current state object
		 * @param {object} action - the action object
		 * @return {object} the updated state object with the cart items cleared
		 */
		clearCartItems: (state, action) => {
			state.cartItems = [];
			return updateCart(state);
		},
	},
});
export const {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
