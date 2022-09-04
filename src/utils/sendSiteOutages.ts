import fetch from "node-fetch";

export const sendSiteOutages = async (body: any) => {
  try {
    const result = await fetch(
      "https://api.krakenflex.systems/interview-tests-mock-api/v1/site-inf/norwich-pear-tree",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "key",
        },
        body: JSON.stringify(body),
      }
    );
    const response = await result.json();

    return response;
  } catch (error) {
    console.error("Error sending outages: ", error);
  }
};
