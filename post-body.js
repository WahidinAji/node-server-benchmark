import http from "k6/http";

export const options = {
    scenarios: {
        default: {
            executor: "shared-iterations",
            gracefulStop: "5s",
            vus: 10,
            iterations: 1000,
            maxDuration: "30s",
        },
        constant: {
            executor: "constant-vus",
            vus: 20,
            duration: "5m",
            startTime: "40s",
            gracefulStop: "10s",
        },
        ramping: {
            executor: "ramping-vus",
            stages: [
                { target: 2, duration: "1s" },
                { target: 10, duration: "20s" },
                { target: 20, duration: "20s" },
                { target: 30, duration: "1m" },
                { target: 40, duration: "1m" },
                { target: 50, duration: "1m" },
            ],
            startTime: "6m",
            gracefulStop: "20s",
        },
    },
};

export default function () {
  const url = "http://localhost:3000/";
  const payload = JSON.stringify({
    "id": 10,
    "title": "HP Pavilion 15-DK1056WM",
    "description": "HP Pavilion 15-DK1056WM Gaming...",
    "price": 1099,
    "discountPercentage": 6.18,
    "rating": 4.43,
    "stock": 89,
    "brand": "HP Pavilion",
    "category": "laptops",
    "thumbnail": "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
    "images": [
      "https://cdn.dummyjson.com/product-images/10/1.jpg",
      "https://cdn.dummyjson.com/product-images/10/2.jpg",
      "https://cdn.dummyjson.com/product-images/10/3.jpg",
      "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg"
    ]
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post(url, payload, params);
}