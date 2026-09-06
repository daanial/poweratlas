/** Shared content model for سازوکار قدرت / The Machinery of Power */

export type SourceType = "scholarly" | "primary" | "dataset" | "reference";

export type RuleCategoryId =
  | "people"
  | "personalist"
  | "monarchy"
  | "oligarchy"
  | "party"
  | "military"
  | "theocratic";

export type ExecutiveSystemType =
  | "presidential"
  | "parliamentary"
  | "semi-presidential";

export type PowerMapEdgeKind =
  | "authority"
  | "votes"
  | "information"
  | "accountability"
  | "coercion"
  | "removal";

export type FingerprintAxisId =
  | "executiveConcentration"
  | "legislativeStrength"
  | "judicialIndependence"
  | "electoralCompetition"
  | "decentralization"
  | "constitutionalConstraints"
  | "mediaIndependence"
  | "leadershipTurnover"
  | "partyCompetition"
  | "civilianControl"
  | "accountability";

export interface PoliticalConcept {
  id: string;
  titleFa: string;
  titleEn: string;
  category: string;
  shortDescriptionFa: string;
  explanationFa: string;
  examples: CountryExample[];
  dimensions: Dimension[];
  misconceptions?: string[];
  tradeoffs?: Tradeoff[];
  sourceIds?: string[];
}

export interface CountryExample {
  id: string;
  nameFa: string;
  nameEn: string;
  noteFa: string;
}

export interface Dimension {
  id: string;
  labelFa: string;
  labelEn: string;
  descriptionFa?: string;
}

export interface Tradeoff {
  id: string;
  choiceFa: string;
  strengthFa: string;
  vulnerabilityFa: string;
}

export interface CountrySystem {
  id: string;
  nameFa: string;
  nameEn: string;
  headOfState: string;
  headOfGovernment: string;
  executiveType: string;
  legislature: string;
  electoralSystem?: string;
  territorialStructure?: string;
  judicialIndependence?: string;
  politicalCompetition?: string;
  fingerprint: Record<FingerprintAxisId, number>;
  sourceIds?: string[];
  /** Short paragraph shown when informed observers disagree on classification. */
  contestedNoteFa?: string;
}

/** Same shape as a current-day country, plus era metadata. */
export interface HistoricalCountrySystem extends Omit<CountrySystem, "id"> {
  id: string;
  parentCountryId: string;
  eraLabelFa: string;
  eraLabelEn: string;
  yearRangeFa: string;
  keyEventFa: string;
}

export interface GlossaryTerm {
  id: string;
  termFa: string;
  termEn: string;
  /** ~1 sentence, for inline tooltip/chip */
  shortDefFa: string;
  /** optional 2–3 sentence expansion for a glossary page */
  longDefFa?: string;
  relatedConceptIds?: string[];
}

export interface CrisisChoice {
  id: string;
  labelFa: string;
  consequenceFa: string;
}

export interface HistoricalCase {
  id: string;
  placeFa: string;
  placeEn: string;
  /** flag emoji, decorative only — omitted where no single modern state maps cleanly */
  flag?: string;
  yearsFa: string;
  /** the crisis choice this case illustrates, when it maps onto one */
  choiceId?: string;
  summaryFa: string;
  takeawayFa: string;
}

export interface CrisisScenario {
  id: string;
  titleFa: string;
  setupFa: string;
  choices: CrisisChoice[];
  institutionalLessonFa: string;
}

export interface BuilderOption {
  id: string;
  labelFa: string;
  labelEn: string;
  descFa?: string;
}

export interface FingerprintAxis {
  id: FingerprintAxisId;
  labelFa: string;
  labelEn: string;
}

export interface PowerMapNode {
  id: string;
  x: number;
  y: number;
  labelFa: string;
  labelEn: string;
  questionsFa: string[];
  explanationFa: string;
}

export interface PowerMapEdge {
  id: string;
  from: string;
  to: string;
  kind: PowerMapEdgeKind;
  labelFa?: string;
}

export interface RuleCategory {
  id: RuleCategoryId;
  titleFa: string;
  titleEn: string;
  questionAnsweredFa: string;
  questionNotAnsweredFa: string;
  shortFa: string;
  combineNoteFa: string;
}

export interface AuthorityFlow {
  from: string;
  to: string;
  bidirectional?: boolean;
}

export interface ExecutiveSystem {
  id: ExecutiveSystemType;
  titleFa: string;
  titleEn: string;
  flows: AuthorityFlow[];
  explanationFa: string;
  tradeoffs: Tradeoff[];
}

export interface ConfusionCard {
  id: string;
  statementFa: string;
  revealFa: string;
  visualHintFa: string;
}

export interface DeJureScenario {
  id: string;
  titleFa: string;
  paperClaimFa: string;
  practiceFactsFa: string[];
  /** 0 = fully captured in practice; 1 = independence holds in practice */
  independenceAtPractice: number;
}

/** A real safeguard from a working democracy against the same capture risk. */
export interface DemocraticSafeguard {
  id: string;
  countryFa: string;
  countryEn: string;
  flag: string;
  mechanismFa: string;
  detailFa: string;
}

export interface PoliticalEra {
  id: string;
  periodFa: string;
  labelFa: string;
  labelEn: string;
  themesFa: string;
  figuresFa: string;
}

export interface PoliticalQuote {
  id: string;
  personFa: string;
  personEn: string;
  quoteFa: string;
  quoteEn: string;
}

export interface PoliticalTradition {
  id: string;
  eyebrowFa: string;
  titleFa: string;
  titleEn: string;
  bodyFa: string[];
  quote?: PoliticalQuote;
  riskLabelFa: string;
  riskFa: string;
}

export interface TraditionComparisonRow {
  id: string;
  featureFa: string;
  moralismFa: string;
  realismFa: string;
}

export interface ContentSource {
  id: string;
  titleFa: string;
  titleEn: string;
  type: SourceType;
  noteFa?: string;
  url?: string;
}

export type FreedomHouseStatus = "free" | "partly-free" | "not-free";

export type RegionIndexLayerId =
  | "politicalFreedom"
  | "politicalStability"
  | "investmentClimate";

export interface RegionIndexCountry {
  id: string;
  iso3: string;
  nameFa: string;
  nameEn: string;
  /** Short map callout when the full name will not fit. */
  mapLabelFa?: string;
  fhScore: number;
  fhStatus: FreedomHouseStatus;
  wgiStability: number;
  wgiRegulatoryQuality: number;
  noteFa: string;
}

export interface RegionIndexLayer {
  id: RegionIndexLayerId;
  labelFa: string;
  labelEn: string;
  shortFa: string;
  unitFa: string;
}
