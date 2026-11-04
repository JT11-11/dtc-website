export type RestrictionCategory =
  | "In force"
  | "Under consideration"
  | "Proposed"
  | "No restriction";

export type RestrictionRecord = {
  country: string;
  countryCode: string;
  status: string;
  lawName: string;
  ageAffected: string;
  description: string;
  region: string;
  year: number;
  sourceUrl: string;
};

export type WorldTopology = {
  objects: { countries: unknown };
} & Record<string, unknown>;

export const RESTRICTION_CATEGORIES: RestrictionCategory[] = [
  "In force",
  "Under consideration",
  "Proposed",
  "No restriction",
];

export const CATEGORY_COLORS: Record<RestrictionCategory, string> = {
  "In force": "#b85c45",
  "Under consideration": "#5c9696",
  Proposed: "#bc934c",
  "No restriction": "#8c9290",
};

export function categoryForStatus(status: string): RestrictionCategory {
  switch (status.toLowerCase()) {
    case "passed":
    case "implemented":
      return "In force";
    case "proposed":
      return "Proposed";
    case "no_restriction":
      return "No restriction";
    default:
      return "Under consideration";
  }
}

export const NUMERIC_ID_BY_ALPHA2: Record<string, string> = {
  AL: "008",
  AE: "784",
  AT: "040",
  AU: "036",
  BE: "056",
  BR: "076",
  CA: "124",
  CH: "756",
  CN: "156",
  CZ: "203",
  DE: "276",
  DK: "208",
  EC: "218",
  EG: "818",
  ES: "724",
  FI: "246",
  FR: "250",
  GB: "826",
  GR: "300",
  ID: "360",
  IE: "372",
  IN: "356",
  IT: "380",
  JP: "392",
  KR: "410",
  MX: "484",
  MY: "458",
  NG: "566",
  NL: "528",
  NO: "578",
  NZ: "554",
  PH: "608",
  PK: "586",
  PL: "616",
  PT: "620",
  SE: "752",
  SI: "705",
  TH: "764",
  TR: "792",
  US: "840",
  VN: "704",
  ZA: "710",
};