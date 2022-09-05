import { filterAndEnrichSiteOutages } from "../filterAndEnrichSiteOutages";

describe("filterAndEnrichSiteOutages", () => {
  let siteInfo = {
    id: "norwich-pear-tree",
    name: "Norwich Pear Tree",
    devices: [
      { id: "111183e7-fb90-436b-9951-63392b36bdd2", name: "Battery 1" },
    ],
  };

  const startDate = "2021-01-01T00:00:00.000Z";

  const outages = [
    {
      id: "111183e7-fb90-436b-9951-63392b36bdd2",
      begin: "2021-12-24T21:38:54.671Z",
      end: "2022-12-25T13:21:44.407Z",
    },
  ];

  test("it should filter out past outages", () => {
    expect(
      filterAndEnrichSiteOutages({
        outages,
        siteInfo,
        startDate: "2022-01-01T00:00:00.000Z",
      })
    ).toEqual([]);
  });

  test("it should filter out outages for different sites", () => {
    expect(
      filterAndEnrichSiteOutages({
        outages: [{ ...outages[0], id: "fake-id" }],
        siteInfo,
        startDate,
      })
    ).toEqual([]);
  });

  test("it should appropriately enrich actual site outages", () => {
    expect(
      filterAndEnrichSiteOutages({
        outages,
        siteInfo,
        startDate,
      })
    ).toEqual([{ ...outages[0], name: siteInfo.devices[0].name }]);
  });
});
