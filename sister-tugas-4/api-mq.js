import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 1000,
  duration: "60s",
};

export default function () {
  const url =
    "https://api-sister-tugas-4.rizalanggoro.space/global-messages/mq";
  const now = new Date();
  const randomMessage = `Hello from k6 using MQ! Current date: ${now.toISOString()}`;
  let res = http.post(
    url,
    JSON.stringify({
      name: "k6",
      message: randomMessage,
    })
  );

  check(res, {
    "status 202": (r) => r.status === 202,
  });
  sleep(1);
}
