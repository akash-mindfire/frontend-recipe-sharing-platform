import { Box, Typography, Button, Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import { useAddReviewMutation, useEditReviewMutation } from "../services/api";
import EditIcon from "@mui/icons-material/Edit";

const labels: { [index: number]: string } = {
  1: "Couldn't eat it",
  2: "Didn't like it",
  3: "It was Ok",
  4: "Liked it",
  5: "Loved it",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function Reviews({ recipeDetail, recipe_id }: any) {
  const [review, setReview] = useState<string>("");
  const [isEditReview, setIsEditReview] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(0);
  const [hover, setHover] = useState(-1);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<any>({});
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [addReview] = useAddReviewMutation();
  const [editReview] = useEditReviewMutation();

  useEffect(() => {
    if (
      recipeDetail &&
      recipeDetail.reviews &&
      Array.isArray(recipeDetail.reviews)
    ) {
      const reviewedData = recipeDetail.reviews.find(
        (review: any) => review._id === user?._id
      );
      if (reviewedData) {
        setIsReviewed(true);
        setIsEditReview(true);
        setReviewData(reviewedData);
      } else {
        setIsReviewed(false);
        setReviewData({});
      }
    }
  }, [recipeDetail, user?._id]);

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleRedirectToLogin = useCallback(() => {
    const currentPage = window.location.pathname;
    navigate(`/login?redirect=${encodeURIComponent(currentPage)}`);
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    try {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        const newReview = {
          _id: parsedAuth.user?._id,
          recipe_Id: recipe_id,
          review_message: review,
          rating: value,
          userName: parsedAuth.user.name,
          image:
            "https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg?semt=ais_hybrid",
        };

        // Submit the review
        const response = isEditReview
          ? await editReview(newReview).unwrap()
          : await addReview(newReview).unwrap();

        if (response) {
          // Update reviews in the local state
          const updatedReviews = [...(recipeDetail.reviews || []), newReview];
          setIsReviewed(true);
          setReviewData(newReview);
          recipeDetail.reviews = updatedReviews; // Update the local recipeDetail

          setReview(""); // Reset the review form
          setValue(0);
        }
      } else {
        toast.error("You must be logged in to submit a review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }, [
    isEditReview,
    recipe_id,
    review,
    value,
    setReview,
    setValue,
    setIsReviewed,
    setReviewData,
    recipeDetail,
  ]);

  const handleCancel = useCallback(() => {
    setReview("");
    setValue(0);
  }, [setReview, setValue]);

  const handleEditReview = useCallback(() => {
    setIsReviewed(false);
    setValue(reviewData.rating);
    setReview(reviewData.review_message);
  }, [
    setIsReviewed,
    setValue,
    setReview,
    reviewData.rating,
    reviewData.review_message,
  ]);

  return (
    <Box sx={{ mt: 2, width: { md: 750, xs: "100%" } }}>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        {`Reviews (${recipeDetail?.reviews?.length || 0})`}
      </Typography>

      {recipeDetail.createrUser_Id !== user?._id && (
        <Box sx={{ p: 3, mt: 2, bgcolor: "#e1e1e1" }}>
          <Box sx={{ bgcolor: "#fff", p: { md: 6, xs: 3 } }}>
            {isLoggedIn ? (
              !isReviewed ? (
                // Review Form
                <Box>
                  {/* Rating Section */}
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ fontWeight: "900" }}>
                      My Rating (required)
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Rating
                        name="hover-feedback"
                        value={value}
                        size="large"
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          console.log(event);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                          console.log(event);
                        }}
                        getLabelText={getLabelText}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2 }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Review Textarea */}
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ fontWeight: "900" }}>
                      My Review (optional)
                    </Typography>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="What did you think about this recipe?"
                      style={{
                        width: "100%",
                        minHeight: "150px",
                        marginTop: "10px",
                        fontFamily: "sans-serif",
                        fontSize: "20px",
                        padding: "1.2rem",
                      }}
                    />
                  </Box>

                  {/* Actions */}
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
                    <Button
                      variant="contained"
                      onClick={handleCancel}
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={!value}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              ) : (
                // Display User Review
                <Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "900" }}>
                      My Review
                    </Typography>
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <EditIcon onClick={handleEditReview} />
                      <Typography onClick={handleEditReview} sx={{ ml: 1 }}>
                        Edit
                      </Typography>
                    </Box>
                  </Box>
                  <Rating
                    name="read-only"
                    value={reviewData.rating}
                    readOnly
                    size="small"
                  />
                  <Typography sx={{ mt: 2 }}>
                    {reviewData.review_message}
                  </Typography>
                </Box>
              )
            ) : (
              // Guest View
              <Box sx={{ textAlign: "center" }}>
                <ReviewsIcon sx={{ fontSize: 50, color: "gray" }} />
                <Typography sx={{ mt: 1 }}>
                  Please log in to add a review.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleRedirectToLogin}
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Display All Reviews */}
      {recipeDetail?.reviews?.length ? (
        recipeDetail.reviews
          .filter((review: any) => review._id !== user?._id)
          .map((review: any) => (
            <Box key={review._id} sx={{ my: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={review.image}
                  alt="user avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ ml: 1, fontWeight: "900" }}
                >
                  {review.userName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  size="small"
                />
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {formatTimestamp(review.createdAt)}
                </Typography>
              </Box>
              <Typography sx={{ my: 1 }}>{review.review_message}</Typography>
              <hr />
            </Box>
          ))
      ) : (
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          No reviews yet.
        </Typography>
      )}
    </Box>
  );
}

export default Reviews;
