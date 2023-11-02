import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
// createApi is for when redux is used for api endpoint
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
