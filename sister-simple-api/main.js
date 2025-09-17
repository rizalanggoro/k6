import { scenario } from "k6/execution"; // Import scenario from k6/execution
import http from "k6/http";

const urls = ["/10kb", "/100kb", "/1mb", "/5mb", "/10mb"];
const vusList = [1, 10, 100, 1000];
const duration = "10s"; // durasi tiap skenario
const gap = 5; // jeda antar skenario dalam detik

// generate scenarios secara otomatis
export const options = {
  scenarios: Object.fromEntries(
    urls.flatMap((url, urlIndex) =>
      vusList.map((vu, vuIndex) => {
        const scenarioName = `vu${vu}_${url.replace("/", "")}`;
        const startTimeSec = (urlIndex * vusList.length + vuIndex) * (30 + gap);
        const startTime = `${startTimeSec}s`;
        return [
          scenarioName,
          {
            executor: "constant-vus",
            vus: vu,
            duration,
            startTime,
          },
        ];
      })
    )
  ),
};

export default function () {
  const scenarioName = scenario.name;

  // tentukan URL berdasarkan nama skenario
  const path =
    urls.find((u) => scenarioName.includes(u.replace("/", ""))) || "/10kb";

  http.get(`https://sister-simple-api.rizalanggoro.space${path}`);
}
