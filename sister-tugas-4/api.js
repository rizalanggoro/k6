import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1000,
  duration: "60s",
};

export default function () {
  const url = "https://api-sister-tugas-4.rizalanggoro.space/global-messages";
  let res = http.post(
    url,
    JSON.stringify({
      name: "k6",
      message: "Hello from k6 load testing tool!",
    })
  );

  check(res, {
    "status 200": (r) => r.status === 200,
  });
}
