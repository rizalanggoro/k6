import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1000, // jumlah virtual user
  duration: "60s", // lama tes
};

// export let options = {
//   stages: [
//     { duration: "10s", target: 2000 },
//     { duration: "10s", target: 0 },

//     // { duration: "10s", target: 1000 }, // spike ke 1000 dalam 10 detik
//     // { duration: "4m", target: 1000 }, // tahan 1000 selama 4 menit
//     // { duration: "50s", target: 0 }, // turun ke 0 dalam 50s
//   ],
//   thresholds: {
//     http_req_duration: ["p(95)<1500"],
//     http_req_failed: ["rate<0.05"],
//   },
// };

export default function () {
  // const url = "https://testing-first.reniuswatun.my.id/files/10kb.html";
  // const url = "https://sister-simple-api.rizalanggoro.space/10kb";
  // const url = "http://dell:1234/10kb";
  // const url = "https://presensigo.rizalanggoro.space";
  const url = "https://load-balancer-api.rizalanggoro.space/hostname";
  let res = http.get(url);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  // sleep(0.5);
}
