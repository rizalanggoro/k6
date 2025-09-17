import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "1m", target: 300 }, // naik ke 300 dalam 1m
    { duration: "2m", target: 1000 }, // naik ke 1000 dalam 2m
    { duration: "1m", target: 1000 }, // tahan 1000 selama 1m
    { duration: "1m", target: 0 }, // turun ke 0 dalam 1m
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% < 1000ms
    http_req_failed: ["rate<0.02"], // <2% error
  },
};

export default function () {
  const url = "https://presensigo.rizalanggoro.space";
  let res = http.get(url);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}
