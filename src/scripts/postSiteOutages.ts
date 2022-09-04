import { Outage } from "../types/Outage";
import { SiteInfo } from "../types/SiteInfo";
import { fetchOutages } from "../utils/fetchOutages";
import { fetchSiteInfo } from "../utils/fetchSiteInfo";
import { filterAndEnrichSiteOutages } from "./utils/filterAndEnrichSiteOutages";
import { sendSiteOutages } from "../utils/sendSiteOutages";

const siteId = "norwich-pear-tree";
const startDate = "2022-01-01T00:00:00.000Z";

async function postSiteOutages() {
  try {
    const outages: Outage[] = await fetchOutages();
    const siteInfo: SiteInfo = await fetchSiteInfo();

    const siteOutages = filterAndEnrichSiteOutages({
      outages,
      siteInfo,
      startDate,
    });

    await sendSiteOutages(siteOutages);
  } catch (error) {}
}

postSiteOutages();
