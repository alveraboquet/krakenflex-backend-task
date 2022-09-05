import { Outage } from "../../types/Outage";
import { SiteInfo } from "../../types/SiteInfo";

type Args = {
  outages: Outage[];
  siteInfo: SiteInfo;
  startDate: string;
};

export const filterAndEnrichSiteOutages = ({
  outages,
  siteInfo,
  startDate,
}: Args) => {
  const siteDeviceIds = siteInfo.devices.map((device) => device.id);

  return outages.reduce((filteredOutages: Outage[], outage) => {
    if (outage.begin >= startDate && siteDeviceIds.includes(outage.id)) {
      const deviceName = siteInfo.devices.find(
        (device) => device.id === outage.id
      )!.name;

      const enrichedOutage = { ...outage, name: deviceName };

      return [...filteredOutages, enrichedOutage];
    }

    return filteredOutages;
  }, []);
};
