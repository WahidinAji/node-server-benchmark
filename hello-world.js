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
    http.get("http://localhost:3000/");
}