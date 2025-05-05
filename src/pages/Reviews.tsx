import "../styles/Reviews.css";

// import { useEffect } from "react";
// import getReviews from "../utils/api";

export default function Reviews() {
    // const reviewIndexRef = useRef(0);
    // const onScreen = 6;
    // const orientSwitch = useRef(false);
    // const onScreenIndex = useRef(Array.fill(new Array(onScreen), false));

    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         try {
    //             // const yelpUrl = "https://api.yelp.com/v3/businesses/YOUR_BUSINESS_ID/reviews";
    //             const googleUrl = "https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews";

    //             // const yelpReviews = await getReviews(yelpUrl);
    //             const googleReviews = await getReviews(googleUrl);

    //             // console.log("Yelp Reviews:", yelpReviews);
    //             console.log("Google Reviews:", googleReviews);
    //         } catch (error) {
    //             console.error("Error fetching reviews:", error);
    //         }
    //     };

    //     fetchReviews();
    // }, []);

    // const reviewsList = () => {
    //     const reviewData = [
    //         {
    //             name: "John Doe",
    //             review: "Great service and friendly staff!",
    //             rating: 5,
    //         },
    //         {
    //             name: "Jane Smith",
    //             review: "Wide selection of bikes and accessories.",
    //             rating: 5,
    //         },
    //         {
    //             name: "Alice Johnson",
    //             review: "Knowledgeable staff and great prices.",
    //             rating: 5,
    //         },
    //         {
    //             name: "Bob Brown",
    //             review: "Had a great experience buying my first bike.",
    //             rating: 5,
    //         },
    //         {
    //             name: "Charlie Davis",
    //             review: "Highly recommend for all your biking needs!",
    //             rating: 5,
    //         },
    //         {
    //             name: "Diana Evans",
    //             review: "The staff is very helpful and friendly.",
    //             rating: 5,
    //         },
    //         {
    //             name: "Ethan Foster",
    //             review: "Best bike shop in town!",
    //             rating: 5,
    //         },
    //         {
    //             name: "Fiona Green",
    //             review: "I love my new bike!",
    //             rating: 5,
    //         },
    //     ];



    return (
        <>
            <div id="reviewsBackground" />
            <section id="reviews">
                <div id="reviewsOverlay" />
                {/* {ReviewsList} */}
            </section>
        </>
    );
};