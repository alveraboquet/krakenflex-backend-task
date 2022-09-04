import fetch from "node-fetch";

export const fetchSiteInfo = async () => {
  try {
    const result = await fetch(
      "https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info/norwich-pear-tree",
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
  } catch (error) {
    console.error("Error fetching info: ", error);
  }
};
