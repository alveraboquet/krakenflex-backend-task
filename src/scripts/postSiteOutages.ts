import { Outage } from "../types/Outage";
import { SiteInfo } from "../types/SiteInfo";

import { filterAndEnrichSiteOutages } from "./utils/filterAndEnrichSiteOutages";
import { makeKrakenFlexRequest } from "./utils/makeKrakenFlexRequest";

const siteId = "norwich-pear-tree";
const startDate = "2022-01-01T00:00:00.000Z";
const baseURL = "https://api.krakenflex.systems/interview-tests-mock-api/v1";

async function postSiteOutages() {
  try {
    const outages: Outage[] = await makeKrakenFlexRequest({
      url: `${baseURL}/outages`,
      method: "GET",
    });

    const siteInfo: SiteInfo = await makeKrakenFlexRequest({
      url: `${baseURL}/site-info/${siteId}`,
      method: "GET",
    });

    const siteOutages = filterAndEnrichSiteOutages({
      outages,
      siteInfo,
      startDate,
    });

    console.log(siteOutages);

    await makeKrakenFlexRequest({
      url: `${baseURL}/site-info/${siteId}`,
      method: "POST",
      body: siteOutages,
    });
  } catch (error) {
    console.error(error);
  }
}

postSiteOutages();
