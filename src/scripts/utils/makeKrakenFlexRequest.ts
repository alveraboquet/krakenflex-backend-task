import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const makeKrakenFlexRequest = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: "GET" | "POST";
  body?: object;
}) => {
  console.log(body);
  const response = await fetch(url, {
    method,
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env!.API_KEY,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(
      "HTTP status " + response.status + ": " + response.statusText
    );
  }
  const data = await response.json();
  return data;
};
