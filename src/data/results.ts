export type ResultsBrand = "nailkada" | "kres";

/** A point traced from a Meta insights chart: [x, views]. */
type Point = [number, number];

export interface ViewsCurve {
  /** x range of the source plot, in the same units as the points */
  x0: number;
  x1: number;
  yMax: number;
  ticks: { x: number; label: string }[];
  post: Point[];
  /** "Your typical post views" baseline; omitted when insights didn't show one */
  typical?: Point[];
  /** Highlighted point shown in the original insights tooltip */
  marker: { x: number; date: string; post: number; typical?: number };
}

export interface ViewsResult {
  id: string;
  brand: ResultsBrand;
  format: "Post" | "Reel";
  views: number;
  viewers?: number;
  followers?: [number, number];
  platforms?: [number, number];
  curve?: ViewsCurve;
}

export const resultsBrands: { label: string; value: ResultsBrand }[] = [
  { label: "Nailkada", value: "nailkada" },
  { label: "Kres Co.", value: "kres" },
];

// Traced from Meta Business Suite "Views" insights. The x-axis is Meta's
// stretched time scale (hours → days), so x is kept in source-plot units.
const META_X = { x0: 205, x1: 1050 };
const META_X_WIDE = { x0: 205, x1: 1060 };

export const viewsResults: ViewsResult[] = [
  // Kres Co.
  {
    id: "kres-1",
    brand: "kres",
    format: "Post",
    views: 275918,
    curve: {
      ...META_X,
      yMax: 280000,
      ticks: [
        { x: 345, label: "5h" },
        { x: 630, label: "23h" },
        { x: 913, label: "9d" },
      ],
      post: [
        [205, 0], [265, 3100], [300, 9400], [350, 19500], [400, 30000],
        [450, 41000], [500, 50000], [540, 56000], [580, 60000], [605, 74000],
        [640, 91000], [665, 120000], [685, 150000], [710, 161000], [735, 178000],
        [750, 190000], [765, 197000], [790, 212000], [805, 217000], [820, 225000],
        [835, 237000], [860, 249000], [885, 256000], [920, 261000], [968, 266253],
        [1010, 269000], [1050, 275918],
      ],
      typical: [[205, 0], [600, 1200], [968, 2304]],
      marker: { x: 968, date: "Feb 8, 12:30pm", post: 266253, typical: 2304 },
    },
  },
  {
    id: "kres-2",
    brand: "kres",
    format: "Post",
    views: 146835,
    curve: {
      ...META_X,
      yMax: 150000,
      ticks: [
        { x: 322, label: "4h" },
        { x: 530, label: "14h" },
        { x: 740, label: "48h" },
        { x: 946, label: "11d" },
      ],
      post: [
        [205, 0], [322, 800], [450, 1500], [550, 2000], [600, 4000],
        [640, 6000], [670, 7500], [690, 8000], [705, 10000], [725, 18000],
        [745, 28000], [760, 31000], [772, 43000], [783, 70000], [795, 90000],
        [805, 93000], [830, 100000], [840, 138000], [850, 141000], [870, 143000],
        [900, 144500], [968, 145293], [1010, 146000], [1050, 146835],
      ],
      typical: [[205, 0], [600, 1100], [968, 2288]],
      marker: { x: 968, date: "Feb 9, 6:00pm", post: 145293, typical: 2288 },
    },
  },
  {
    id: "kres-3",
    brand: "kres",
    format: "Post",
    views: 50703,
    viewers: 18352,
    followers: [5436, 45267],
    curve: {
      ...META_X,
      yMax: 60000,
      ticks: [
        { x: 347, label: "4.5h" },
        { x: 628, label: "19h" },
        { x: 909, label: "4.5d" },
      ],
      post: [
        [205, 0], [270, 1600], [300, 3500], [340, 6000], [365, 9200],
        [400, 11500], [450, 13800], [500, 15900], [545, 17100], [600, 17600],
        [640, 18900], [690, 20600], [705, 22000], [740, 27600], [760, 28600],
        [790, 29400], [820, 35500], [840, 37000], [870, 39500], [900, 40500],
        [930, 42000], [945, 42800], [960, 45200], [975, 46000], [990, 49000],
        [1010, 50300], [1037, 50642],
      ],
      typical: [[205, 0], [600, 1100], [1037, 2271]],
      marker: { x: 1037, date: "Feb 16, 12:00pm", post: 50642, typical: 2271 },
    },
  },
  {
    id: "kres-4",
    brand: "kres",
    format: "Post",
    views: 43978,
    viewers: 19751,
    followers: [3871, 40107],
    curve: {
      ...META_X,
      yMax: 44000,
      ticks: [
        { x: 343, label: "4.5h" },
        { x: 628, label: "20h" },
        { x: 913, label: "5.5d" },
      ],
      post: [
        [205, 0], [265, 1500], [300, 3000], [330, 4300], [360, 5900],
        [380, 7700], [395, 8700], [415, 9400], [440, 11600], [470, 13000],
        [500, 14200], [550, 14800], [590, 16900], [640, 18500], [680, 19300],
        [715, 22900], [760, 24000], [780, 25500], [795, 27000], [820, 28000],
        [840, 32300], [865, 33500], [890, 37600], [915, 41000], [940, 43000],
        [960, 43800], [1037, 43933],
      ],
      typical: [[205, 0], [600, 1100], [1037, 2304]],
      marker: { x: 1037, date: "Feb 15, 3:46pm", post: 43933, typical: 2304 },
    },
  },
  {
    id: "kres-5",
    brand: "kres",
    format: "Post",
    views: 18226,
    curve: {
      ...META_X,
      yMax: 19000,
      ticks: [
        { x: 345, label: "5h" },
        { x: 630, label: "23h" },
        { x: 913, label: "9d" },
      ],
      post: [
        [205, 0], [260, 600], [300, 1300], [350, 2500], [400, 3300],
        [450, 4100], [500, 4900], [540, 5500], [600, 5700], [640, 6450],
        [685, 7500], [720, 7600], [735, 8150], [755, 10200], [775, 10500],
        [790, 13300], [805, 13600], [820, 15100], [833, 16700], [850, 17000],
        [880, 17500], [958, 18025], [1050, 18226],
      ],
      typical: [[205, 0], [400, 700], [640, 1100], [750, 1500], [958, 2288]],
      marker: { x: 958, date: "Feb 8, 10:46am", post: 18025, typical: 2288 },
    },
  },

  // Nailkada
  {
    id: "nailkada-1",
    brand: "nailkada",
    format: "Reel",
    views: 154043,
    curve: {
      ...META_X_WIDE,
      yMax: 90000,
      ticks: [
        { x: 345, label: "5h" },
        { x: 632, label: "23h" },
        { x: 920, label: "9d" },
      ],
      post: [
        [205, 0], [230, 500], [350, 1000], [450, 1500], [550, 2500],
        [600, 4000], [640, 6000], [680, 9500], [720, 11000], [745, 13500],
        [765, 16700], [780, 18500], [795, 25000], [805, 28700], [818, 30500],
        [830, 35600], [840, 55700], [850, 61000], [862, 64000], [880, 67000],
        [895, 68500], [910, 71500], [930, 73000], [960, 74500], [980, 75500],
        [1000, 76000], [1015, 77500], [1060, 80300],
      ],
      typical: [[205, 0], [1060, 240]],
      marker: { x: 1060, date: "Feb 24, 3:00pm", post: 80300, typical: 240 },
    },
  },
  {
    id: "nailkada-2",
    brand: "nailkada",
    format: "Post",
    views: 87790,
    curve: {
      ...META_X_WIDE,
      yMax: 90000,
      ticks: [
        { x: 345, label: "5h" },
        { x: 632, label: "23h" },
        { x: 920, label: "9d" },
      ],
      post: [
        [205, 0], [345, 500], [360, 1500], [390, 3000], [420, 5500],
        [450, 7400], [470, 8500], [480, 11900], [500, 14000], [520, 16500],
        [540, 18500], [555, 20000], [565, 24000], [575, 27500], [590, 42600],
        [605, 54000], [620, 66000], [632, 78800], [640, 80500], [655, 81800],
        [700, 82200], [800, 82350], [1060, 82467],
      ],
      marker: { x: 1060, date: "Jun 27, 1:06pm", post: 82467 },
    },
  },
  {
    id: "nailkada-3",
    brand: "nailkada",
    format: "Reel",
    views: 16669,
    curve: {
      ...META_X_WIDE,
      yMax: 11000,
      ticks: [
        { x: 345, label: "5h" },
        { x: 632, label: "23h" },
        { x: 920, label: "9d" },
      ],
      post: [
        [205, 250], [220, 1200], [265, 1360], [290, 1600], [298, 2200],
        [320, 2600], [340, 2850], [358, 3160], [380, 3950], [400, 4500],
        [430, 5100], [455, 5500], [480, 5800], [495, 6000], [510, 6300],
        [520, 6900], [540, 7100], [570, 7500], [600, 8200], [620, 8500],
        [640, 8700], [680, 8900], [735, 9000], [750, 9300], [770, 9500],
        [830, 9600], [840, 9900], [880, 10000], [960, 10050], [1060, 10175],
      ],
      typical: [[205, 0], [1060, 240]],
      marker: { x: 1060, date: "Feb 21, 4:00pm", post: 10175, typical: 240 },
    },
  },
  {
    id: "nailkada-4",
    brand: "nailkada",
    format: "Post",
    views: 11762,
    followers: [204, 11499],
    platforms: [7126, 4636],
    curve: {
      ...META_X_WIDE,
      yMax: 8000,
      ticks: [
        { x: 345, label: "5h" },
        { x: 632, label: "23h" },
        { x: 920, label: "9d" },
      ],
      post: [
        [205, 150], [240, 1300], [265, 1900], [280, 2800], [300, 3900],
        [315, 4200], [345, 4800], [370, 5200], [390, 5500], [415, 5850],
        [450, 5950], [500, 6100], [560, 6200], [600, 6250], [615, 6400],
        [640, 6450], [660, 6600], [690, 6700], [740, 6750], [760, 6850],
        [850, 6900], [950, 6950], [1060, 7000],
      ],
      marker: { x: 1060, date: "Jul 21, 12:02pm", post: 7000 },
    },
  },
  {
    id: "nailkada-5",
    brand: "nailkada",
    format: "Post",
    views: 6195,
    followers: [209, 5946],
    platforms: [4815, 1380],
  },
];
