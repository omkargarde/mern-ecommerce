import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./assets/styles/index.css";
import AdminRoute from "./components/AdminRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductEditScreen from "./screens/admin/ProductEditScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import UserEditScreen from "./screens/admin/UserEditScreen.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import store from "./store.js";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/page/:pageNumber" element={<HomeScreen />} />
			<Route path="/search/:keyword" element={<HomeScreen />} />
			<Route
				path="/search/:keyword/page/:pageNumber"
				element={<HomeScreen />}
			/>

			<Route path="/product/:id" element={<ProductScreen />} />
			<Route path="/cart" element={<CartScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />

			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<ShippingScreen />} />
				<Route path="/payment" element={<PaymentScreen />} />
				<Route path="/placeorder" element={<PlaceOrderScreen />} />
				<Route path="/order/:id" element={<OrderScreen />} />
				<Route path="/profile" element={<ProfileScreen />} />
			</Route>
			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/orderlist" element={<OrderListScreen />} />
				<Route path="/admin/productlist" element={<ProductListScreen />} />
				<Route
					path="/admin/productlist/:pageNumber"
					element={<ProductListScreen />}
				/>
				<Route
					path="/admin/productlist/:id/edit"
					element={<ProductEditScreen />}
				/>
				<Route path="/admin/userlist" element={<UserListScreen />} />
				<Route path="/admin/userlist/:id/edit" element={<UserEditScreen />} />
			</Route>
		</Route>,
	),
);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<PayPalScriptProvider>
					<RouterProvider router={router} />
				</PayPalScriptProvider>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>,
);
