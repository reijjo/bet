import { BasicApiResponse } from "../../utils/api-response-types";
import { FeedbackMessage, FeedbackMessageAdmin } from "../../utils/types";
import { baseApi } from "./baseApi";

export const feedbackApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query<FeedbackMessageAdmin[], void>({
      query: () => "/feedback",
      providesTags: ["Feedback"],
    }),
    addFeedback: builder.mutation<BasicApiResponse, FeedbackMessage>({
      query: (feedback) => ({
        url: "/feedback",
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: ["Feedback"],
    }),
    editFeedback: builder.mutation<BasicApiResponse, FeedbackMessageAdmin>({
      query: (feedback) => ({
        url: `/feedback/${feedback.id}`,
        method: "PATCH",
        body: feedback,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Feedback", id }],
    }),
  }),
});

export const {
  useGetAllFeedbackQuery,
  useAddFeedbackMutation,
  useEditFeedbackMutation,
} = feedbackApiSlice;
