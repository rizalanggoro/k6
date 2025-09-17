import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1000,
  duration: "60s",
};

export default function () {
  const url = "https://load-balancer-api.rizalanggoro.space/hostname";
  let res = http.get(url);

  check(res, {
    "status 200": (r) => r.status === 200,
  });
}
