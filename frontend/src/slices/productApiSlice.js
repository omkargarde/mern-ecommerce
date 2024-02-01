import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

/**
 * Product API slice to handle product data operations like getting all products, getting product details and creating new products.
 * Exports React Query hooks to perform API requests and cache responses.
 */
export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: PRODUCT_URL,
				params: { keyword, pageNumber },
			}),
			providesTags: ["Product"],
			keepUnusedDataFor: 5,
		}),
		getProductsDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCT_URL,
				method: "POST",
			}),
			invalidatesTags: ["Product"],
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data.productId}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `${UPLOAD_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`,
				method: "DELETE",
			}),
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data.productId}/reviews`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductsDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useCreateReviewMutation,
} = productApiSlice;
