export type SiteInfo = {
  id: string;
  name: string;
  devices: Device[];
};

type Device = {
  id: string;
  name: string;
};
