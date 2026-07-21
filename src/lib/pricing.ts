export type DeviceTab = "iphone" | "samsung" | "ipad" | "macbook" | "laptop";

export type PricingRow = { model: string; screen: string; battery: string; port: string; camera: string; other: string };

export const pricingData: Record<DeviceTab, PricingRow[]> = {
  iphone: [
    { model: "iPhone 15 Pro Max", screen: "£229", battery: "£89", port: "£65", camera: "£149", other: "—" },
    { model: "iPhone 15 Pro", screen: "£209", battery: "£85", port: "£65", camera: "£139", other: "—" },
    { model: "iPhone 15", screen: "£179", battery: "£79", port: "£59", camera: "£119", other: "—" },
    { model: "iPhone 14 Pro Max", screen: "£189", battery: "£75", port: "£55", camera: "£129", other: "—" },
    { model: "iPhone 14 Pro", screen: "£179", battery: "£75", port: "£55", camera: "£119", other: "—" },
    { model: "iPhone 14", screen: "£149", battery: "£69", port: "£49", camera: "£99", other: "—" },
    { model: "iPhone 13 Pro Max", screen: "£169", battery: "£69", port: "£49", camera: "£109", other: "—" },
    { model: "iPhone 13", screen: "£129", battery: "£59", port: "£45", camera: "£89", other: "—" },
    { model: "iPhone 12", screen: "£109", battery: "£55", port: "£45", camera: "£79", other: "—" },
    { model: "iPhone 11", screen: "£89", battery: "£49", port: "£39", camera: "£69", other: "—" },
    { model: "iPhone SE", screen: "£69", battery: "£45", port: "£35", camera: "£59", other: "—" },
  ],
  samsung: [
    { model: "Galaxy S24 Ultra", screen: "£259", battery: "£95", port: "£65", camera: "£159", other: "—" },
    { model: "Galaxy S24+", screen: "£229", battery: "£89", port: "£59", camera: "£139", other: "—" },
    { model: "Galaxy S24", screen: "£199", battery: "£85", port: "£55", camera: "£119", other: "—" },
    { model: "Galaxy S23 Ultra", screen: "£229", battery: "£85", port: "£55", camera: "£139", other: "—" },
    { model: "Galaxy S23", screen: "£179", battery: "£79", port: "£49", camera: "£109", other: "—" },
    { model: "Galaxy A54", screen: "£119", battery: "£59", port: "£39", camera: "£79", other: "—" },
    { model: "Galaxy A34", screen: "£99", battery: "£55", port: "£35", camera: "£69", other: "—" },
  ],
  ipad: [
    { model: "iPad Pro 12.9\"", screen: "£329", battery: "£129", port: "£79", camera: "£149", other: "—" },
    { model: "iPad Pro 11\"", screen: "£279", battery: "£119", port: "£69", camera: "£129", other: "—" },
    { model: "iPad Air", screen: "£219", battery: "£99", port: "£59", camera: "£99", other: "—" },
    { model: "iPad Mini", screen: "£189", battery: "£89", port: "£55", camera: "£89", other: "—" },
    { model: "iPad 10th Gen", screen: "£179", battery: "£89", port: "£49", camera: "£79", other: "—" },
  ],
  macbook: [
    { model: "MacBook Pro 16\"", screen: "£499", battery: "£249", port: "£89", camera: "—", other: "KB: £299" },
    { model: "MacBook Pro 14\"", screen: "£449", battery: "£229", port: "£85", camera: "—", other: "KB: £279" },
    { model: "MacBook Air 15\"", screen: "£389", battery: "£189", port: "£79", camera: "—", other: "KB: £249" },
    { model: "MacBook Air 13\"", screen: "£349", battery: "£179", port: "£75", camera: "—", other: "KB: £229" },
  ],
  laptop: [
    { model: "HP (Various)", screen: "£149–£299", battery: "£89–£159", port: "£55–£85", camera: "—", other: "KB: £99–£199" },
    { model: "Dell (Various)", screen: "£149–£299", battery: "£89–£159", port: "£55–£85", camera: "—", other: "KB: £99–£199" },
    { model: "Lenovo (Various)", screen: "£139–£279", battery: "£85–£149", port: "£49–£79", camera: "—", other: "KB: £89–£179" },
    { model: "ASUS (Various)", screen: "£139–£279", battery: "£85–£149", port: "£49–£79", camera: "—", other: "KB: £89–£179" },
  ],
};

const repairColumns = ["screen", "battery", "port", "camera"] as const;
export type RepairColumn = (typeof repairColumns)[number];

const isDeviceTab = (d: string): d is DeviceTab => d in pricingData;
const isRepairColumn = (r: string): r is RepairColumn => (repairColumns as readonly string[]).includes(r);

const priceNumbers = (value: string): number[] => (value.match(/£\d+/g) || []).map(v => Number(v.slice(1)));

/** Published price for a device + model + repair. `exact` is false when the table lists a range. Null if not in the tables. */
export const lookupPrice = (
  device: string | null | undefined,
  model: string | null | undefined,
  repair: string | null | undefined,
): { amount: number; exact: boolean } | null => {
  if (!device || !model || !repair || !isDeviceTab(device) || !isRepairColumn(repair)) return null;
  const row = pricingData[device].find(r => r.model === model);
  const prices = row ? priceNumbers(row[repair]) : [];
  return prices.length ? { amount: Math.min(...prices), exact: prices.length === 1 } : null;
};

/** Lowest published price for a repair type across every device table. */
export const minPriceFor = (repair: RepairColumn): number =>
  Math.min(...Object.values(pricingData).flatMap(rows => rows.flatMap(row => priceNumbers(row[repair]))));
