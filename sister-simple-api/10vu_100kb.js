import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const url = "https://sister-simple-api.rizalanggoro.space/100kb";
  let res = http.get(url);

  check(res, {
    "status 200": (r) => r.status === 200,
  });
}
