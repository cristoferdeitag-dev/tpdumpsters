import { NextResponse } from "next/server";

interface GoogleReview {
  authorAttribution: {
    displayName: string;
    photoUri: string;
    uri: string;
  };
  rating: number;
  text?: {
    text: string;
    languageCode: string;
  };
  relativePublishTimeDescription: string;
  publishTime: string;
}

interface GooglePlacesResponse {
  reviews?: GoogleReview[];
  rating?: number;
  userRatingCount?: number;
}

export interface ReviewData {
  name: string;
  avatar: string;
  profileUrl: string;
  rating: number;
  text: string;
  date: string;
  publishTime: string;
}

export interface ReviewsResponse {
  reviews: ReviewData[];
  overallRating: number;
  totalReviews: number;
  source: "google" | "fallback";
}

const FALLBACK_REVIEWS: ReviewData[] = [
  {
    name: "Jose Antonio Miranda",
    avatar: "/images/reviews/avatar-jose.jpg",
    profileUrl: "#",
    rating: 5,
    text: "Tiago and his crew were amazing and fast. My wife and I were very impressed with the quality of the work. They were very professional and knowledgeable. I highly recommend them for any project.",
    date: "7 months ago",
    publishTime: "",
  },
  {
    name: "Caning Repair",
    avatar: "/images/reviews/avatar-caning.jpg",
    profileUrl: "#",
    rating: 5,
    text: "Great service and very reliable. They showed up on time and took care of everything. Would definitely use them again!",
    date: "8 months ago",
    publishTime: "",
  },
  {
    name: "Michael Thompson",
    avatar: "/images/reviews/avatar-default.jpg",
    profileUrl: "#",
    rating: 5,
    text: "Super easy process from start to finish. Called them up, got a quote right away, and the dumpster was delivered the next morning. Pickup was just as smooth. Best dumpster rental experience in the Bay Area.",
    date: "3 months ago",
    publishTime: "",
  },
  {
    name: "Sarah Jenkins",
    avatar: "/images/reviews/avatar-default.jpg",
    profileUrl: "#",
    rating: 5,
    text: "We used TP Dumpsters for our home renovation project. They were prompt, affordable, and the team was incredibly friendly. Highly recommend to anyone in the East Bay!",
    date: "5 months ago",
    publishTime: "",
  },
  {
    name: "David Nguyen",
    avatar: "/images/reviews/avatar-default.jpg",
    profileUrl: "#",
    rating: 5,
    text: "Fantastic service! I needed a dumpster for a big cleanout and they made the whole process seamless. Fair pricing and great communication throughout. Will be a repeat customer for sure.",
    date: "2 months ago",
    publishTime: "",
  },
];

// Cache reviews in memory for 24 hours
let cachedData: ReviewsResponse | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function fetchGoogleReviews(): Promise<ReviewsResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn("Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID");
    return {
      reviews: FALLBACK_REVIEWS,
      overallRating: 5,
      totalReviews: FALLBACK_REVIEWS.length,
      source: "fallback",
    };
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "reviews,rating,userRatingCount",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Google Places API error:", response.status, errorText);
    return {
      reviews: FALLBACK_REVIEWS,
      overallRating: 5,
      totalReviews: FALLBACK_REVIEWS.length,
      source: "fallback",
    };
  }

  const data: GooglePlacesResponse = await response.json();

  if (!data.reviews || data.reviews.length === 0) {
    return {
      reviews: FALLBACK_REVIEWS,
      overallRating: data.rating ?? 5,
      totalReviews: data.userRatingCount ?? FALLBACK_REVIEWS.length,
      source: "fallback",
    };
  }

  const reviews: ReviewData[] = data.reviews.map((r) => ({
    name: r.authorAttribution.displayName,
    avatar: r.authorAttribution.photoUri,
    profileUrl: r.authorAttribution.uri,
    rating: r.rating,
    text: r.text?.text ?? "",
    date: r.relativePublishTimeDescription,
    publishTime: r.publishTime,
  }));

  return {
    reviews,
    overallRating: data.rating ?? 5,
    totalReviews: data.userRatingCount ?? reviews.length,
    source: "google",
  };
}

export async function GET() {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const data = await fetchGoogleReviews();
    cachedData = data;
    cacheTimestamp = now;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    // Return fallback on any error
    const fallback: ReviewsResponse = {
      reviews: FALLBACK_REVIEWS,
      overallRating: 5,
      totalReviews: FALLBACK_REVIEWS.length,
      source: "fallback",
    };
    return NextResponse.json(fallback);
  }
}
