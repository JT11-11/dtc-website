// Canonical research/project catalogue.
//
// Single source of truth for "Our Work". The client showcase
// (components/blocks/work-dtc.tsx), /api/work, /api/search and sitemap.ts
// all read from here — adding a paper means editing this file once,
// not hunting through components.

export interface WorkItem {
  id: string;
  number: string;
  title: string;
  titleItalic: string;
  type: string;
  status: string;
  summary: string;
  whyItMatters: string;
  workInProgress?: boolean;
  cta?: { label: string; href: string };
}

export const workItems: WorkItem[] = [
  {
    id: "marginalized-youth-isolation",
    number: "01",
    title: "Social Media Restrictions &",
    titleItalic: "Marginalized Youth Isolation",
    type: "Empirical Pilot Study",
    status: "Under peer review · Taylor & Francis (Social Sciences)",
    summary:
      "Original research on how blanket, age-based platform restrictions affect marginalized youth, with marginalized teenagers as the central case. Drawing on survey data and qualitative interviews, the study examines the relationship between platform access restrictions and the loss of community, support networks, and identity resources for the young people who depend on these spaces most.",
    whyItMatters:
      "Policymakers enacting social media bans have consistently cited child safety, but our data shows those bans fall hardest on the teenagers most dependent on online spaces for their safety. For marginalized youth in hostile households or conservative communities, restricting social media doesn't protect them. It removes their only safe social infrastructure. This study puts evidence behind a claim advocates have been making for years.",
  },
  {
    id: "restriction-database",
    number: "02",
    title: "The Global Teen",
    titleItalic: "Restriction Database",
    type: "Systematic Database",
    status: "Active · ongoing data collection and updates",
    summary:
      "The world's first systematic map of age-based internet restrictions. The database documents every formal legislative instrument, executive order, and platform policy that restricts minors' access to social media, messaging platforms, or general internet services across 40+ countries, including the type of restriction, legal basis, enforcement mechanisms, and reported implementation outcomes.",
    whyItMatters:
      "Before this project, no comprehensive picture of the global restriction landscape existed. Policymakers in one country had no systematic way to learn from outcomes in another. Advocates lacked the evidentiary base to challenge restrictions in court or in policy rooms. We built the map that should have existed before anyone started legislating.",
  },
  {
    id: "un-ageism-audit",
    number: "03",
    title: "UN Website",
    titleItalic: "Ageism Audit",
    type: "Institutional Audit",
    status: "Completed",
    summary:
      "A systematic audit examining how youth are framed across UN agency websites: whether young people appear as subjects of policy (things to be managed) or as agents (participants who shape decisions). We also assessed whether the websites themselves were navigable and accessible for young people seeking to engage with UN processes, including language complexity, navigation structure, and availability of entry-point information.",
    whyItMatters:
      "Institutions that claim to include youth but design their public-facing presence to exclude them are performing participation, not practicing it. This audit produced a concrete, citable record of that gap, and a baseline against which future improvements can be measured.",
  },
  {
    id: "opportunity-mapping",
    number: "04",
    title: "Youth Access Barriers in",
    titleItalic: "Global Governance",
    type: "Opportunity-Mapping Database",
    status: "Active · Phase 2 in progress",
    summary:
      "A database mapping the structural barriers youth face when attempting to participate in major international governance processes: the UN system, the ITU, the WTO, regional bodies, and others. We document accreditation requirements, age restrictions, language barriers, financial barriers (travel costs, registration fees), and the structural design choices that effectively exclude young people from the rooms where decisions get made.",
    whyItMatters:
      "Youth participation is only as real as the actual mechanisms that enable it. This database turns vague claims about 'youth inclusion' into auditable, specific claims about access, and identifies which processes have the lowest and highest barriers to meaningful engagement.",
  },
  {
    id: "adci-audit",
    number: "05",
    title: "ADCI Restriction",
    titleItalic: "Audit",
    type: "Community Tool",
    status: "Live · by Aditya",
    summary:
      "An interactive globe-view tool mapping ADCI restriction data, built by Executive Director Aditya. Provides a visual interface for exploring the restriction landscape, building on DTC's open dataset.",
    whyItMatters:
      "Community tools that build on DTC's data validate the downstream value of systematic, open data collection. The ADCI Audit demonstrates how DTC's restriction dataset enables independent researchers and builders to create new forms of accountability.",
    cta: { label: "Open the Audit", href: "https://adciaudit.base44.app/GlobeView" },
  },
  {
    id: "digital-trade-hack-2026",
    number: "06",
    title: "Digital Trade",
    titleItalic: "Hack 2026",
    type: "Hackathon Entry · KMITL",
    status: "Completed · 2026",
    summary:
      "DTC's entry to the Digital Trade Hack 2026 at King Mongkut's Institute of Technology Ladkrabang (KMITL). A working prototype applying DTC's digital-governance research to a regtech challenge, with a full demo on YouTube and project documentation available.",
    whyItMatters:
      "Competitions like the Digital Trade Hack connect DTC's policy research to engineering and regulatory-technology audiences, demonstrating that youth-led policy work produces functional, deployable outputs — not just position papers.",
    cta: { label: "Watch Demo", href: "https://www.youtube.com/watch?v=7NsyYwT0-E4" },
  },
  {
    id: "tfgbv-article",
    number: "07",
    title: "Technology-Facilitated",
    titleItalic: "Gender-Based Violence",
    type: "Op-Ed",
    status: "Work in progress",
    workInProgress: true,
    summary:
      "An op-ed examining Technology-Facilitated Gender-Based Violence (TFGBV) and its policy dimensions. Currently in development.",
    whyItMatters:
      "Platform-enabled gender-based violence is one of the most rapidly escalating harms in digital policy. DTC's article contributes youth-researcher analysis to a field where most published work comes from outside the generation most affected.",
  },
  {
    id: "tfgbv-4p-commentary",
    number: "08",
    title: "TFGBV",
    titleItalic: "4P Commentary",
    type: "Commentary",
    status: "Completed",
    summary:
      "A commentary applying the 4P framework to Technology-Facilitated Gender-Based Violence (TFGBV), examining how the framework maps onto platform-mediated harm and where it requires adaptation for the digital context.",
    whyItMatters:
      "Policy frameworks travel faster than the evidence base. Commentary that maps standard tools onto new harm types helps policymakers apply existing instruments more precisely and flags where structural gaps make new frameworks necessary.",
    cta: {
      label: "Read the Commentary",
      href: "https://docs.google.com/document/d/1hXdePXGfxR-1x1_eRtlfgBHP_tDF2hA_V2DDEkJ7PJg/edit?usp=sharing",
    },
  },
  {
    id: "social-media-policy-paper",
    number: "09",
    title: "The Case for Statutory Regulation as the",
    titleItalic: "Preferred Governance Model for Social Media Platforms",
    type: "Policy Paper · Preprint",
    status: "Preprint · Under review at Taylor & Francis (Social Sciences)",
    summary:
      "A 10-page preprint by Hisham Jamali, Hunthavi Vipassana, and Tejas Karusala, posted on SSRN on August 7, 2026 and written July 28, 2026. The paper makes the normative and objective case for statutory regulation as the preferred way to govern social media platforms, arguing that it fits the economic realities of a free market, prevents unlawful censorship, and creates a unified regulatory framework. Keywords: Social Media, Internet Policy, Digital Governance, Statutory Regulation.",
    whyItMatters:
      "The paper recommends strong roles for intergovernmental institutions and international law, an international court of arbitration, and a digital-rights statutory court to resolve disputes among users, platforms, and governments. It condemns blanket social-media bans and extremely strong regulation while proposing principles for better policy design. These recommendations offer policymakers a structured alternative to fragmented platform governance and overbroad restrictions.",
    cta: { label: "Read the Preprint", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7198900" },
  },
  {
    id: "icc-prosecutorial-patterns",
    number: "10",
    title: "Prosecutorial Patterns at the ICC:",
    titleItalic: "Trigger Mechanisms, Geography, and Case Outcomes",
    type: "Research Paper",
    status: "Completed · SSRN preprint",
    summary:
      "A 23-page study by Aditya Majumdar, posted on SSRN on August 15, 2026 and written August 12, 2026. The paper analyzes all 75 defendant-proceedings involving 74 unique individuals indicted by the International Criminal Court between 2005 and 2026, examining geography, trigger mechanisms, alleged crimes, and case outcomes. Using web-scraped data cross-verified with official court records, it investigates the pattern of African cases and accusations of anti-African bias. Keywords: International Law, International Criminal Court, Selective Justice, Geopolitics, African Bias in ICC.",
    whyItMatters:
      "The study finds that 78.7% of proceedings originate from African states, while the largest number of African cases were initiated through state referrals tied with UN Security Council referrals. A chi-square analysis finds a statistically significant relationship between how a case reaches the ICC and its eventual outcome (χ² = 38.42, p < 0.001, Cramer's V = 0.41). It also finds that 40% of defendants remain at large, rising to 87.5% for non-African cases, offering a data-based contribution to debates about ICC selectivity, geopolitics, and accountability.",
    cta: { label: "Read the Paper", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7274078" },
  },
];

export function getWorkItem(id: string): WorkItem | undefined {
  return workItems.find((w) => w.id === id);
}
