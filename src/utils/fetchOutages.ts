import fetch from "node-fetch";

export const fetchOutages = async () => {
  const result = await fetch(
    "https://api.krakenflex.systems/interview-tests-mock-api/v1/outages",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "key",
      },
    }
  );
  const response = await result.json();
  return response;
};
