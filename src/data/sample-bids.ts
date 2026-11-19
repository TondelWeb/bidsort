// SAMPLE DATA. Every project, bid number, value and date below is invented for the demo.
// Agency and town names are real NC places so the demo feels local; the jobs are not real.
// Due dates are stored as "days from today" so the demo never goes stale.

export type TradeKey =
  | 'concrete'
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'roofing'
  | 'sitework'
  | 'painting'
  | 'masonry';

export const TRADES: { key: TradeKey; label: string; division: string }[] = [
  { key: 'concrete', label: 'Concrete', division: 'Div 03' },
  { key: 'electrical', label: 'Electrical', division: 'Div 26' },
  { key: 'plumbing', label: 'Plumbing', division: 'Div 22' },
  { key: 'hvac', label: 'HVAC', division: 'Div 23' },
  { key: 'roofing', label: 'Roofing', division: 'Div 07' },
  { key: 'sitework', label: 'Sitework', division: 'Div 31–33' },
  { key: 'painting', label: 'Painting', division: 'Div 09' },
  { key: 'masonry', label: 'Masonry', division: 'Div 04' },
];

export interface SpecSection {
  code: string;
  name: string;
  trade: TradeKey;
}

export interface Bid {
  id: string;
  number: string;
  title: string;
  agency: string;
  source: string;
  place: string;
  milesFromRaleigh: number;
  value: number;
  dueInDays: number;
  prebid: { inDays: number; where: string; mandatory: boolean } | null;
  planholders: number;
  scope: string;
  specs: SpecSection[];
}

export const SOURCES = [
  'NC eVP',
  'Wake County Bids',
  'City of Raleigh Bid Portal',
  'BidNet Direct (NC)',
  'NCDOT Connect',
  'Durham Bonfire Portal',
  'Triangle Plan Room',
  'Johnston County Purchasing',
] as const;

const s = (code: string, name: string, trade: TradeKey): SpecSection => ({ code, name, trade });

export const BIDS: Bid[] = [
  // ---- Concrete, within 60 miles of Raleigh (6) ----
  {
    id: 'garner-sidewalk',
    number: 'RFB 26-118',
    title: 'Sidewalk & ADA ramp replacement, Phase 3',
    agency: 'Town of Garner',
    source: 'BidNet Direct (NC)',
    place: 'Garner',
    milesFromRaleigh: 9,
    value: 186000,
    dueInDays: 9,
    prebid: { inDays: 3, where: 'Garner Town Hall, 900 7th Ave', mandatory: false },
    planholders: 7,
    scope:
      'Remove and replace about 2,400 LF of 5-ft sidewalk and 31 curb ramps to current ADA standards along Vandora Springs Rd and Aversboro Rd. Includes detectable warning panels, minor grading and traffic control.',
    specs: [
      s('03 30 00', 'Cast-in-place concrete', 'concrete'),
      s('32 16 00', 'Curbs, gutters, sidewalks', 'concrete'),
      s('32 12 16', 'Asphalt paving (patching)', 'sitework'),
    ],
  },
  {
    id: 'rolesville-gym-slab',
    number: 'WCPSS 2026-047',
    title: 'Gym slab-on-grade replacement, Rolesville Middle',
    agency: 'Wake County Public School System',
    source: 'Wake County Bids',
    place: 'Rolesville',
    milesFromRaleigh: 18,
    value: 412000,
    dueInDays: 14,
    prebid: { inDays: 5, where: 'Rolesville Middle School, main office', mandatory: true },
    planholders: 11,
    scope:
      'Demolish and replace 9,800 SF gym slab with vapor barrier and new control joints. Work must finish during summer break. Flooring by others.',
    specs: [
      s('03 30 00', 'Cast-in-place concrete', 'concrete'),
      s('03 35 00', 'Concrete finishing', 'concrete'),
      s('02 41 19', 'Selective demolition', 'sitework'),
    ],
  },
  {
    id: 'cary-greenway-abutments',
    number: 'ITB 26-031',
    title: 'Black Creek Greenway bridge abutments',
    agency: 'Town of Cary',
    source: 'NC eVP',
    place: 'Cary',
    milesFromRaleigh: 11,
    value: 268000,
    dueInDays: 12,
    prebid: null,
    planholders: 6,
    scope:
      'Two reinforced concrete abutments and wingwalls for a 90-ft prefabricated pedestrian bridge. Includes excavation, rebar, formwork and erosion control. Bridge set by others.',
    specs: [
      s('03 20 00', 'Concrete reinforcing', 'concrete'),
      s('03 30 00', 'Cast-in-place concrete', 'concrete'),
      s('31 23 00', 'Excavation and fill', 'sitework'),
    ],
  },
  {
    id: 'johnston-fire-apron',
    number: 'JC-26-112',
    title: 'Fire Station 3 apparatus bay apron',
    agency: 'Johnston County',
    source: 'Johnston County Purchasing',
    place: 'Smithfield',
    milesFromRaleigh: 27,
    value: 95000,
    dueInDays: 10,
    prebid: null,
    planholders: 4,
    scope:
      'Replace the cracked 3,100 SF concrete apron in front of the apparatus bays with 8-in reinforced concrete. Station stays in service, so work is phased in two halves.',
    specs: [s('03 30 00', 'Cast-in-place concrete', 'concrete'), s('32 13 13', 'Concrete paving', 'concrete')],
  },
  {
    id: 'ncsu-deck-repair',
    number: 'NCSU 26-0219',
    title: 'Dan Allen parking deck structural repairs',
    agency: 'NC State University',
    source: 'NC eVP',
    place: 'Raleigh',
    milesFromRaleigh: 3,
    value: 740000,
    dueInDays: 21,
    prebid: { inDays: 7, where: 'Dan Allen Deck, level 1 entrance', mandatory: true },
    planholders: 9,
    scope:
      'Spall and delamination repairs on 4 levels, expansion joint replacement, traffic-coating and re-striping. Deck stays partly open during work.',
    specs: [
      s('03 01 30', 'Concrete repair', 'concrete'),
      s('07 18 00', 'Traffic coatings', 'roofing'),
      s('09 91 00', 'Painting (striping)', 'painting'),
    ],
  },
  {
    id: 'holly-springs-streetscape',
    number: 'RFB 26-009',
    title: 'Main Street streetscape, curb & gutter',
    agency: 'Town of Holly Springs',
    source: 'Triangle Plan Room',
    place: 'Holly Springs',
    milesFromRaleigh: 20,
    value: 330000,
    dueInDays: 17,
    prebid: { inDays: 6, where: 'Holly Springs Town Hall, Room 2B', mandatory: false },
    planholders: 8,
    scope:
      'New 2-ft curb and gutter, stamped concrete crosswalks and planter curbs along 0.4 miles of Main St. Includes storm inlet adjustments.',
    specs: [
      s('32 16 00', 'Curbs, gutters, sidewalks', 'concrete'),
      s('32 13 13', 'Concrete paving (stamped)', 'concrete'),
      s('33 40 00', 'Storm drainage', 'sitework'),
    ],
  },

  // ---- Concrete, outside 60 miles (3) ----
  {
    id: 'wilmington-bulkhead',
    number: 'CW-26-077',
    title: 'Riverwalk bulkhead cap replacement',
    agency: 'City of Wilmington',
    source: 'BidNet Direct (NC)',
    place: 'Wilmington',
    milesFromRaleigh: 130,
    value: 520000,
    dueInDays: 15,
    prebid: null,
    planholders: 5,
    scope: 'Replace 600 LF of deteriorated concrete bulkhead cap and railing anchors along the Riverwalk.',
    specs: [s('03 30 00', 'Cast-in-place concrete', 'concrete')],
  },
  {
    id: 'buncombe-clarifier',
    number: 'BC-26-040',
    title: 'Water plant clarifier concrete repairs',
    agency: 'Buncombe County',
    source: 'NC eVP',
    place: 'Asheville',
    milesFromRaleigh: 245,
    value: 310000,
    dueInDays: 19,
    prebid: { inDays: 8, where: 'North Fork WTP', mandatory: true },
    planholders: 3,
    scope: 'Crack injection and surface repairs in two clarifier basins, plus new weir supports.',
    specs: [s('03 01 30', 'Concrete repair', 'concrete')],
  },
  {
    id: 'greensboro-shelters',
    number: 'GSO-26-155',
    title: 'Transit shelter pads and lighting, 14 stops',
    agency: 'City of Greensboro',
    source: 'BidNet Direct (NC)',
    place: 'Greensboro',
    milesFromRaleigh: 75,
    value: 205000,
    dueInDays: 11,
    prebid: null,
    planholders: 6,
    scope: 'Concrete shelter pads, ADA landings and solar shelter lighting at 14 GTA bus stops.',
    specs: [s('32 16 00', 'Curbs, gutters, sidewalks', 'concrete'), s('26 56 00', 'Exterior lighting', 'electrical')],
  },

  // ---- Other trades (15) ----
  {
    id: 'dps-hvac',
    number: 'DPS 26-HVAC-04',
    title: 'Hope Valley Elementary HVAC replacement',
    agency: 'Durham Public Schools',
    source: 'Durham Bonfire Portal',
    place: 'Durham',
    milesFromRaleigh: 25,
    value: 1150000,
    dueInDays: 16,
    prebid: { inDays: 4, where: 'Hope Valley Elementary', mandatory: true },
    planholders: 12,
    scope: 'Replace rooftop units and classroom unit ventilators, new DDC controls and associated electrical.',
    specs: [s('23 74 00', 'Packaged outdoor HVAC', 'hvac'), s('26 05 00', 'Common work for electrical', 'electrical')],
  },
  {
    id: 'raleigh-led',
    number: 'COR-26-212',
    title: 'Municipal Building LED lighting retrofit',
    agency: 'City of Raleigh',
    source: 'City of Raleigh Bid Portal',
    place: 'Raleigh',
    milesFromRaleigh: 1,
    value: 128000,
    dueInDays: 8,
    prebid: null,
    planholders: 9,
    scope: 'Replace about 1,100 fluorescent fixtures with LED and add occupancy sensors on floors 2–6.',
    specs: [s('26 51 00', 'Interior lighting', 'electrical')],
  },
  {
    id: 'orange-library-roof',
    number: 'OC-26-031',
    title: 'Main library roof replacement',
    agency: 'Orange County',
    source: 'NC eVP',
    place: 'Hillsborough',
    milesFromRaleigh: 30,
    value: 286000,
    dueInDays: 13,
    prebid: { inDays: 5, where: 'Orange County Main Library', mandatory: false },
    planholders: 7,
    scope: 'Tear off and replace 14,000 SF low-slope roof with TPO, new insulation and edge metal.',
    specs: [s('07 54 23', 'TPO roofing', 'roofing')],
  },
  {
    id: 'sanford-water-main',
    number: 'CS-26-018',
    title: 'Water main replacement, Phase 2',
    agency: 'City of Sanford',
    source: 'BidNet Direct (NC)',
    place: 'Sanford',
    milesFromRaleigh: 42,
    value: 960000,
    dueInDays: 22,
    prebid: { inDays: 9, where: 'Sanford Municipal Center', mandatory: false },
    planholders: 10,
    scope: 'Replace 6,200 LF of 6-in and 8-in water main with services, valves and hydrants. Includes road patching.',
    specs: [s('33 14 00', 'Water utility distribution', 'plumbing'), s('31 23 00', 'Excavation and fill', 'sitework')],
  },
  {
    id: 'chatham-restrooms',
    number: 'CC-26-009',
    title: 'Jordan Lake recreation area restroom renovation',
    agency: 'Chatham County',
    source: 'NC eVP',
    place: 'Apex (Jordan Lake)',
    milesFromRaleigh: 28,
    value: 74000,
    dueInDays: 10,
    prebid: null,
    planholders: 3,
    scope: 'New fixtures, water heater and partitions in two restroom buildings, then repaint interiors.',
    specs: [s('22 40 00', 'Plumbing fixtures', 'plumbing'), s('09 91 00', 'Painting', 'painting')],
  },
  {
    id: 'durham-police-paint',
    number: 'COD-26-301',
    title: 'Police headquarters interior repaint',
    agency: 'City of Durham',
    source: 'Durham Bonfire Portal',
    place: 'Durham',
    milesFromRaleigh: 24,
    value: 58000,
    dueInDays: 7,
    prebid: null,
    planholders: 5,
    scope: 'Repaint walls, doors and frames on three floors. Night and weekend work only.',
    specs: [s('09 91 23', 'Interior painting', 'painting')],
  },
  {
    id: 'wake-forest-masonry',
    number: 'TWF-26-014',
    title: 'Community center masonry repointing',
    agency: 'Town of Wake Forest',
    source: 'Triangle Plan Room',
    place: 'Wake Forest',
    milesFromRaleigh: 17,
    value: 112000,
    dueInDays: 18,
    prebid: { inDays: 6, where: 'Alston-Massenburg Center', mandatory: false },
    planholders: 4,
    scope: 'Repoint about 6,500 SF of brick, replace damaged units and rebuild two parapet caps.',
    specs: [s('04 01 20', 'Masonry repointing', 'masonry')],
  },
  {
    id: 'ncdot-culvert',
    number: 'NCDOT C204871',
    title: 'Culvert replacement on SR 1100 over Cedar Creek',
    agency: 'NCDOT Division 5',
    source: 'NCDOT Connect',
    place: 'Franklin County',
    milesFromRaleigh: 30,
    value: 520000,
    dueInDays: 20,
    prebid: null,
    planholders: 8,
    scope: 'Replace a failing pipe culvert with a precast box culvert. Detour, erosion control and paving.',
    specs: [s('31 23 00', 'Excavation and fill', 'sitework'), s('33 42 00', 'Culverts', 'sitework')],
  },
  {
    id: 'apex-field-lighting',
    number: 'TOA-26-062',
    title: 'Hunter Street Park ball field lighting',
    agency: 'Town of Apex',
    source: 'BidNet Direct (NC)',
    place: 'Apex',
    milesFromRaleigh: 15,
    value: 215000,
    dueInDays: 12,
    prebid: null,
    planholders: 6,
    scope: 'Replace metal-halide field lighting on two diamonds with LED, new poles and controls.',
    specs: [s('26 56 68', 'Exterior athletic lighting', 'electrical')],
  },
  {
    id: 'nccu-boiler',
    number: 'NCCU 26-117',
    title: 'Residence hall boiler and domestic water replacement',
    agency: 'NC Central University',
    source: 'NC eVP',
    place: 'Durham',
    milesFromRaleigh: 25,
    value: 640000,
    dueInDays: 24,
    prebid: { inDays: 8, where: 'NCCU Facilities, Building 4', mandatory: true },
    planholders: 7,
    scope: 'Replace two boilers, domestic water heaters and associated piping in Eagleson Hall.',
    specs: [s('23 52 00', 'Heating boilers', 'hvac'), s('22 34 00', 'Water heaters', 'plumbing')],
  },
  {
    id: 'granville-courthouse-roof',
    number: 'GC-26-005',
    title: 'Courthouse roof and gutter repairs',
    agency: 'Granville County',
    source: 'NC eVP',
    place: 'Oxford',
    milesFromRaleigh: 40,
    value: 98000,
    dueInDays: 9,
    prebid: null,
    planholders: 3,
    scope: 'Repair standing-seam roof, replace copper gutters and downspouts on the historic courthouse.',
    specs: [s('07 61 13', 'Standing seam metal roofing', 'roofing')],
  },
  {
    id: 'harnett-hvac-controls',
    number: 'HC-26-088',
    title: 'Senior center HVAC controls upgrade',
    agency: 'Harnett County',
    source: 'NC eVP',
    place: 'Lillington',
    milesFromRaleigh: 33,
    value: 86000,
    dueInDays: 11,
    prebid: null,
    planholders: 4,
    scope: 'Replace pneumatic controls with DDC, tie into the county building automation system.',
    specs: [s('23 09 23', 'Direct digital controls', 'hvac')],
  },
  {
    id: 'fayetteville-brick',
    number: 'COF-26-140',
    title: 'Fire Station 12 brick veneer repair',
    agency: 'City of Fayetteville',
    source: 'BidNet Direct (NC)',
    place: 'Fayetteville',
    milesFromRaleigh: 62,
    value: 64000,
    dueInDays: 14,
    prebid: null,
    planholders: 2,
    scope: 'Remove and rebuild cracked brick veneer on the north wall with new ties and flashing.',
    specs: [s('04 21 13', 'Brick masonry', 'masonry')],
  },
  {
    id: 'fuquay-restroom',
    number: 'TFV-26-021',
    title: 'Fleming Loop Park restroom building',
    agency: 'Town of Fuquay-Varina',
    source: 'Wake County Bids',
    place: 'Fuquay-Varina',
    milesFromRaleigh: 22,
    value: 390000,
    dueInDays: 23,
    prebid: { inDays: 7, where: 'Fuquay-Varina Town Hall', mandatory: false },
    planholders: 9,
    scope: 'New 640 SF block restroom building with plumbing, lighting and site utilities.',
    specs: [
      s('04 22 00', 'Concrete unit masonry', 'masonry'),
      s('22 40 00', 'Plumbing fixtures', 'plumbing'),
      s('26 05 00', 'Common work for electrical', 'electrical'),
    ],
  },
  {
    id: 'waketech-lot',
    number: 'WTCC 26-033',
    title: 'Parking lot C resurfacing and striping',
    agency: 'Wake Tech Community College',
    source: 'Wake County Bids',
    place: 'Raleigh',
    milesFromRaleigh: 12,
    value: 230000,
    dueInDays: 10,
    prebid: null,
    planholders: 6,
    scope: 'Mill and overlay 11,000 SY of asphalt, repair base failures and re-stripe 420 spaces.',
    specs: [s('32 12 16', 'Asphalt paving', 'sitework'), s('32 17 23', 'Pavement markings', 'painting')],
  },
];

export function tradesOf(bid: Bid): TradeKey[] {
  return [...new Set(bid.specs.map((x) => x.trade))];
}

export function matches(bid: Bid, trade: TradeKey, radius: number): boolean {
  return tradesOf(bid).includes(trade) && bid.milesFromRaleigh <= radius;
}
