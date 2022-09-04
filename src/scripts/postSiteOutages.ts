import { Outage } from "../types/Outage";
import { SiteInfo } from "../types/SiteInfo";
import { fetchOutages } from "../utils/fetchOutages";
import { fetchSiteInfo } from "../utils/fetchSiteInfo";
import { sendSiteOutages } from "../utils/sendSiteOutages";

const siteId = "norwich-pear-tree";
const startDate = "2022-01-01T00:00:00.000Z";

async function postSiteOutages() {
  try {
    const outages: Outage[] = await fetchOutages();
    const siteInfo: SiteInfo = await fetchSiteInfo();

    const siteDeviceIds = siteInfo.devices.map((device) => device.id);

    const enrichedFilteredOutages = outages.reduce(
      (filteredOutages: Outage[], outage) => {
        if (outage.begin > startDate && siteDeviceIds.includes(outage.id)) {
          const deviceName = siteInfo.devices.find(
            (device) => device.id === outage.id
          )!.name;
          return [...filteredOutages, { ...outage, name: deviceName }];
        } else {
          return filteredOutages;
        }
      },
      []
    );

    await sendSiteOutages(enrichedFilteredOutages);
  } catch (error) {}
}

postSiteOutages();
