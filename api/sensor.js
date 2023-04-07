/**
 * Seconds between sensor ADC readings
 * @const
 */
export const SECONDS = 60;

/**
 * Example device information
 */
export const exampleDevices = [
  {
    id: 0,
    name: "HT100",
    signal: "-77dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Left Hip",
    calibration: [30, 40, 50],
    pressure: 350,
    temperature: 50,
    humidity: 50,
    paused: false,
    expanded: false,
  },
  {
    id: 1,
    name: "HT110",
    signal: "-50dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Right Hip",
    calibration: [30, 40, 50],
    pressure: 300,
    temperature: 40,
    humidity: 20,
    paused: false,
    expanded: false,
  },
  {
    id: 2,
    name: "HT120",
    signal: "-111dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Left Heel",
    calibration: [30, 40, 50],
    pressure: 300,
    temperature: 30,
    humidity: 20,
    paused: false,
    expanded: false,
  },
  {
    id: 3,
    name: "HT130",
    signal: "-121dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Right Heel",
    calibration: [30, 40, 50],
    pressure: 300,
    temperature: 30,
    humidity: 20,
    paused: false,
    expanded: false,
  },
];

/**
 * List of example ADC readings from trials
 */
export const exampleAdc = [
    11,
    8,
    9,
    11,
    12,
    11,
    11,
    11,
    11,
    2277,
    2277,
    2274,
    2276,
    2277,
    2275,
    2276,
    2273,
    2274,
    2275,
    2276,
    2276,
    2279,
    2249,
    2279,
    2278,
    2276,
    2271,
    2276,
    2276,
    2277,
    2276,
    2268,
    2277,
    2278,
    2276,
    2278,
    2277,
    2276,
    2276,
    2268,
    2278,
    2279,
    2274,
    2273,
    2276,
    2274,
    2275,
    2274,
    2275,
    2273,
    2275,
    2274,
    2278,
    2275,
    2276,
    2275,
    2276,
    2276,
    2272,
    2276,
    2268,
    2272,
    2275,
    2275,
    2275,
    2275,
    2273,
    2275,
    2275,
    2275,
    2274,
    2276,
    2274,
    2275,
    2274,
    2275,
    2278,
    2253,
    2274,
    2275,
    2275,
    2274,
    2274,
    2274,
    2276,
    2273,
    2274,
    2275,
    2270,
    2272,
    2274,
    2272,
    2274,
    2274,
    2255,
    2278,
    2268,
    2274,
    2271,
    2270,
    2272,
    2273,
    2273,
    2272,
    2274,
    2273,
    2272,
    2272,
    2265,
    2267,
    2272,
    2268,
    2274,
    2274,
    2275,
    2273,
    2276,
    2272,
    2268,
    2272,
    2269,
    2272,
    2271,
    2272,
    2269,
    2273,
    2272,
    2270,
    2271,
    2270,
    2273,
    2272,
    2268,
    2271,
    2276,
    2272,
    2272,
    2272,
    2273,
    2270,
    2274,
    2274,
    2275,
    2272,
    2276,
    2272,
    2274,
    2272,
    2271,
    2253,
    2257,
    2265,
    2264,
    2274,
    2274,
    2273,
    2272,
    2276,
    2271,
    2274,
    2274,
    2275,
    2273,
    2272,
    2272,
    2272,
    2256,
    2273,
    2273,
    2276,
    2271,
    2272,
    2274,
    2276,
    2275,
    2273,
    2275,
    2275,
    2278,
    2275,
    2272,
    2277,
    2272,
    2270,
    2273,
    2276,
    2277,
    2265,
    2257,
    2261,
    2249,
    2258,
    2267,
    2268,
    2265,
    2269,
    2268,
    2270,
    2278,
    2280,
    2277,
    2277,
    2276,
    2274,
    2270,
    2278,
    2276,
    2280,
    2280,
    2278,
    2276,
    2278,
    2278,
    2277,
    2280,
    2282,
    2278,
    2280,
    2278,
    2281,
    2276,
    2258,
    2279,
    2278,
    2278,
    2281,
    2278,
    2280,
    2279,
    2282,
    2278,
    2280,
    2279,
    2279,
    2279,
    2279,
    2281,
    2283,
    2272,
    2278,
    2279,
    2277,
    2276,
    2276,
    2279,
    2276,
    2278,
    2278,
    2277,
    2276,
    2276,
    2280,
    2280,
    2280,
    2276,
    2273,
    2281,
    2277,
    2281,
    2277,
    2277,
    2267,
    2273,
    2273,
    2269,
    2263,
    2264,
    2258,
    2266,
    2272,
    2274,
    2273,
    2275,
    2276,
    2280,
    2280,
    2269,
    2276,
    2284,
    2280,
    2281,
    2279,
    2282,
    2281,
    2278,
    2280,
    2279,
    2279,
    2277,
    2281,
    2281,
    2282,
    2283,
    2252,
    2281,
    2281,
    2280,
    2278,
    2277,
    2278,
    2279,
    2275,
    2277,
    2279,
    2278,
    2279,
    2273,
    2275,
    2276,
    2278,
    2272,
    2277,
    2274,
    2279,
    2280,
    2278,
    2280,
    2279,
    2281,
    2280,
    2277,
    2279,
    2273,
    2280,
    2278,
    2277,
    2277,
    2278,
    2280,
    2278,
    2278,
    2276,
    2276,
    2278,
    2278,
    2278,
    2275,
    2278,
    2278,
    2278,
    2278,
    2279,
    2276,
    2276,
    2276,
    2275,
    2278,
    2277,
    2271,
    2279,
    2281,
    2282,
    2281,
    2277,
    2279,
    2280,
    2281,
    2282,
    2282,
    2276,
    2278,
    2278,
    2280,
    2283,
    2282,
    2248,
    2280,
    2281,
    2281,
    2282,
    2278,
    2280,
    2284,
    2280,
    2283,
    2280,
    2279,
    2282,
    2283,
    2280,
    2277,
    2280,
    2271,
    2281,
    2279,
    2279,
    2278,
    2279,
    2280,
    2281,
    2279,
    2283,
    2279,
    2282,
    2282,
    2283,
    2281,
    2279,
    2283,
    2279,
    2279,
    2280,
    2279,
    2274,
    2280,
    2280,
    2282,
    2279,
    2278,
    2276,
    2275,
    2262,
    2271,
    2274,
    2275,
    2273,
    2274,
    2274,
    2273,
    2276,
    2265,
    2271,
    2275,
    2272,
    2269,
    2268,
    2271,
    2271,
    2274,
    2274,
    2275,
    2274,
    2273,
    2272,
    2274,
    2272,
    2275,
    2218,
    2276,
    2278,
    2270,
    2275,
    2273,
    2274,
    2276,
    2275,
    2276,
    2276,
    2272,
    2271,
    2272,
    2272,
    2272,
    2272,
    2264,
    2275,
    2274,
    2268,
    2276,
    2273,
    2278,
    2276,
    2275,
    2275,
    2262,
    2268,
    2266,
    2269,
    2272,
    2272,
    2268,
    2272,
    2276,
    2271,
    2270,
    2270,
    2276,
    2270,
    2268,
    2269,
    2270,
    2270,
    2274,
    2265,
    2252,
    2268,
    2272,
    2272,
    2275,
    2272,
    2270,
    2273,
    2260,
    2271,
    2272,
    2279,
    2273,
    2274,
    2272,
    2272,
    2273,
    2274,
    2273,
    2272,
    2274,
    2274,
    2274,
    2277,
    2275,
    2242,
    2275,
    2274,
    2276,
    2274,
    2273,
    2275,
    2275,
    2272,
    2273,
    2274,
    2275,
    2276,
    2270,
    2276,
    2279,
    2276,
    2270,
    2275,
    2274,
    2275,
    2273,
    2274,
    2276,
    2276,
    2278,
    2276,
    2277,
    2276,
    2276,
    2276,
    2276,
    2276,
    2276,
    2275,
    2275,
    2275,
    2278,
    2274,
    2277,
    2274,
    2275,
    2274,
    2277,
    2275,
    2278,
    2276,
    2275,
    2272,
    2276,
    2278,
    2274,
    2278,
    2270,
    2272,
    2258,
    2274,
    2274,
    2275,
    2275,
    2275,
    2276,
    2275,
    2276,
    2274,
    2274,
    2275,
    2276,
    2272,
    2272,
    2272,
    2272,
    2237,
    2276,
    2275,
    2273,
    2274,
    2273,
    2276,
    2275,
    2276,
    2274,
    2273,
    2273,
    2275,
    2274,
    2277,
    2276,
    2276,
    2266,
    2272,
    2275,
    2275,
    2276,
    2274,
    2276,
    2273,
    2273,
    2276,
    2271,
    2274,
    2275,
    2275,
    2273,
    2275,
    2275,
    2276,
    2279,
    2277,
    2274,
    2267,
    2275,
    2277,
    2276,
    2277,
    2276,
    2277,
    2276,
    2278,
    2278,
    2274,
    2275,
    2279,
    2278,
    2275,
    2278,
    2276,
    2254,
    2275,
    2274,
    2276,
    2278,
    2278,
    2277,
    2276,
    2277,
    2276,
    2276,
    2275,
    2277,
    2276,
    2274,
    2276,
    2277,
    2245,
    2274,
    2274,
    2275,
    2274,
    2275,
    2276,
    2275,
    2276,
    2277,
    2275,
    2276,
    2274,
    2278,
    2278,
    2270,
    2276,
    2270,
    2274,
    2274,
    2279,
    2275,
    2272,
    2278,
    2276,
    2278,
    2278,
    2276,
    2276,
    2278,
    2276,
    2276,
    2278,
    2276,
    2275,
    2280,
    2279,
    2276,
    2270,
    2278,
    2276,
    2275,
    2273,
    2272,
    2274,
    2274,
    2275,
    2269,
    2274,
    2269,
    2268,
    2271,
    2271,
    2271,
    2271,
    2248,
    2270,
    2270,
    2270,
    2274,
    2273,
    2271,
    2270,
    2273,
    2271,
    2272,
    2271,
    2269,
    2270,
    2272,
    2272,
    2270,
    2253,
    2272,
    2272,
    2272,
    2273,
    2274,
    2274,
    2275,
    2275,
    2272,
    2272,
    2274,
    2272,
    2274,
    2276,
    2272,
    2276,
    2271,
    2273,
    2275,
    2277,
    2273,
    2270,
    2276,
    2276,
    2276,
    2275,
    2277,
    2275,
    2276,
    2276,
    2278,
    2274,
    2276,
    2276,
    2276,
    2275,
    2276,
    2268,
    2276,
    2276,
    2276,
    2277,
    2272,
    2273,
    2276,
    2277,
    2274,
    2276,
    2276,
    2276,
    2276,
    2278,
    2278,
    2279,
    2255,
    2278,
    2270,
    2272,
    2269,
    2273,
    2270,
    2270,
    2269,
    2272,
    2270,
    2272,
    2271,
    2270,
    2271,
    2271,
    2271,
    2256,
    2268,
    2269,
    2270,
    2269,
    2266,
    2271,
    2271,
    2271,
    2272,
    2274,
    2272,
    2273,
    2271,
    2271,
    2271,
    2272,
    2268,
    2269,
    2270,
    2271,
    2267,
    2262,
    2266,
    2265,
    2265,
    2265,
    2267,
    2263,
    2267,
    2265,
    2264,
    2267,
    2269,
    2266,
    2265,
    2265,
    2266,
    2259,
    2265,
    2270,
    2270,
    2271,
    2267,
    2268,
    2268,
    2269,
    2267,
    2268,
    2268,
    2267,
    2268,
    2268,
    2269,
    2267,
    2236,
    2266,
    2266,
    2270,
    2269,
    2263,
    2266,
    2264,
    2266,
    2265,
    2265,
    2266,
    2268,
    2266,
    2268,
    2268,
    2266,
    2249,
    2267,
    2267,
    2265,
    2265,
    2263,
    2264,
    2266,
    2266,
    2265,
    2266,
    2267,
    2266,
    2267,
    2268,
    2266,
    2265,
    2264,
    2266,
    2267,
    2268,
    2260,
    2263,
    2268,
    2270,
    2270,
    2271,
    2271,
    2265,
    2265,
    2262,
    2267,
    2265,
    2264,
    2265,
    2265,
    2264,
    2261,
    2253,
    2260,
    2262,
    2263,
    2266,
    2263,
    2264,
    2264,
    2267,
    2264,
    2268,
    2267,
    2266,
    2264,
    2266,
    2265,
    2267,
    2234,
    2266,
    2268,
    2263,
    2263,
    2260,
    2265,
    2263,
    2265,
    2260,
    2265,
    2266,
    2264,
    2262,
    2263,
    2261,
    2265,
    2256,
    2262,
    2263,
    2262,
    2265,
    2265,
    2265,
    2265,
    2266,
    2265,
    2266,
    2267,
    2265,
    2267,
    2268,
    2267,
    2266,
    2264,
    2269,
    2267,
    2271,
    2266,
    2260,
    2270,
    2269,
    2266,
    2268,
    2267,
    2268,
    2268,
    2270,
    2271,
    2272,
    2271,
    2272,
    2270,
    2272,
    2268,
    2257,
    2265,
    2267,
    2268,
    2258,
    2260,
    2253,
    2251,
    2252,
    2253,
    2252,
    2253,
    2255,
    2256,
    2255,
    2256,
    2255,
    2224,
    2257,
    2257,
    2258,
    2254,
    2252,
    2258,
    2256,
    2256,
    2256,
    2258,
    2257,
    2256,
    2256,
    2258,
    2258,
    2261,
    2250,
    2259,
    2261,
    2255,
    2259,
    2257,
    2239,
    2254,
    2259,
    2263,
    2264,
    2258,
    2264,
    2259,
    2262,
    2263,
    2263,
    2262,
    2260,
    2261,
    2261,
    2258,
    2254,
    2262,
    2264,
    2261,
    2262,
    2263,
    2261,
    2263,
    2263,
    2261,
    2263,
    2265,
    2262,
    2260,
    2262,
    2262,
    2250,
    2260,
    2261,
    2259,
    2261,
    2260,
    2264,
    2263,
    2260,
    2264,
    2262,
    2261,
    2261,
    2261,
    2260,
    2260,
    2258,
    2208,
    2261,
    2262,
    2262,
    2264,
    2262,
    2264,
    2264,
    2260,
    2263,
    2263,
    2262,
    2263,
    2263,
    2262,
    2263,
    2262,
    2255,
    2264,
    2262,
    2263,
    2262,
    2260,
    2263,
    2262,
    2263,
    2266,
    2263,
    2263,
    2264,
    2265,
    2265,
    2262,
    2263,
    2263,
    2264,
    2262,
    2262,
    2258,
    2253,
    2261,
    2263,
    2262,
    2262,
    2264,
    2263,
    2262,
    2266,
    2262,
    2262,
    2261,
    2262,
    2262,
    2263,
    2262,
    2247,
    2261,
    2264,
    2264,
    2261,
    2264,
    2261,
    2261,
    2262,
    2262,
    2257,
    2259,
    2258,
    2258,
    2261,
    2260,
    2258,
    2209,
    2259,
    2260,
    2260,
    2260,
    2259,
    2256,
    2258,
    2257,
    2260,
    2262,
    2260,
    2257,
    2260,
    2258,
    2260,
    2256,
    2248,
    2258,
    2257,
    2258,
    2260,
    2254,
    2258,
    2260,
    2260,
    2259,
    2258,
    2256,
    2255,
    2258,
    2258,
    2257,
    2255,
    2258,
    2257,
    2259,
    2258,
    2253,
    2248,
    2256,
    2256,
    2258,
    2258,
    2260,
    2258,
    2258,
    2257,
    2259,
    2259,
    2261,
    2258,
    2258,
    2259,
    2259,
    2241,
    2260,
    2259,
    2260,
    2260,
    2258,
    2259,
    2260,
    2259,
    2258,
    2259,
    2258,
    2258,
    2260,
    2259,
    2260,
    2259,
    2221,
    2260,
    2260,
    2260,
    2263,
    2261,
    2260,
    2264,
    2262,
    2261,
    2261,
    2262,
    2260,
    2258,
    2261,
    2262,
    2262,
    2254,
    2260,
    2259,
    2259,
    2256,
    2250,
    2255,
    2259,
    2256,
    2256,
    2255,
    2257,
    2256,
    2255,
    2257,
    2259,
    2255,
    2255,
    2257,
    2256,
    2255,
    2250,
    2246,
    2255,
    2256,
    2257,
    2256,
    2255,
    2255,
    2256,
    2254,
    2258,
    2257,
    2256,
    2255,
    2257,
    2256,
    2257,
    2246,
    2256,
    2260,
    2258,
    2259,
    2255,
    2258,
    2259,
    2263,
    2258,
    2258,
    2259,
    2259,
    2258,
    2261,
    2260,
    2262,
    2227,
    2258,
    2258,
    2257,
    2254,
    2255,
    2246,
    2247,
    2258,
    2257,
    2259,
    2260,
    2262,
    2262,
    2263,
    2262,
    2266,
    2254,
    2262,
    2263,
    2262,
    2263,
    2258,
    2263,
    2264,
    2263,
    2264,
    2262,
    2262,
    2263,
    2265,
    2262,
    2264,
    2261,
    2261,
    2264,
    2263,
    2262,
    2258,
    2249,
    2262,
    2264,
    2264,
    2265,
    2259,
    2264,
    2260,
    2262,
    2261,
    2262,
    2262,
    2263,
    2263,
    2264,
    2264,
    2243,
    2264,
    2263,
    2264,
    2263,
    2266,
    2265,
    2265,
    2266,
    2262,
    2264,
    2265,
    2267,
    2259,
    2258,
    2261,
    2258,
    2234,
    2256,
    2258,
    2258,
    2259,
    2264,
    2264,
    2261,
    2261,
    2260,
    2260,
    2261,
    2262,
    2262,
    2263,
    2264,
    2262,
    2257,
    2262,
    2262,
    2262,
    2260,
    2258,
    2265,
    2264,
    2264,
    2261,
    2265,
    2265,
    2265,
    2263,
    2262,
    2261,
    2264,
    2263,
    2263,
    2263,
    2263,
    2254,
    2247,
    2257,
    2261,
    2261,
    2260,
    2264,
    2264,
    2261,
    2257,
    2262,
    2265,
    2261,
    2260,
    2262,
    2261,
    2261,
    2238,
    2260,
    2260,
    2264,
    2261,
    2260,
    2265,
    2263,
    2261,
    2260,
    2262,
    2262,
    2263,
    2260,
    2259,
    2260,
    2261,
    2242,
    2260,
    2260,
    2259,
    2259,
    2256,
    2257,
    2260,
    2258,
    2257,
    2258,
    2255,
    2255,
    2256,
    2256,
    2254,
    2257,
    2251,
    2256,
    2257,
    2258,
    2256,
    2251,
    2256,
    2260,
    2256,
    2257,
    2257,
    2258,
    2258,
    2257,
    2257,
    2256,
    2255,
    2256,
    2258,
    2256,
    2256,
    2246,
    2239,
    2257,
    2258,
    2259,
    2255,
    2257,
    2258,
    2260,
    2257,
    2259,
    2260,
    2257,
    2257,
    2257,
    2260,
    2258,
    2234,
    2254,
    2255,
    2256,
    2256,
    2254,
    2256,
    2257,
    2255,
    2255,
    2256,
    2256,
    2263,
    2264,
    2260,
    2259,
    2259,
    2248,
    2252,
    2253,
    2254,
    2252,
    2252,
    2255,
    2256,
    2255,
    2253,
    2253,
    2256,
    2255,
    2256,
    2256,
    2254,
    2254,
    2252,
    2255,
    2258,
    2257,
    2258,
    2252,
    2253,
    2252,
    2257,
    2258,
    2257,
    2257,
    2256,
    2254,
    2258,
    2255,
    2258,
    2254,
    2256,
    2258,
    2256,
    2246,
    2234,
    2256,
    2255,
    2254,
    2254,
    2255,
    2255,
    2255,
    2255,
    2249,
    2253,
    2253,
    2253,
    2253,
    2256,
    2254,
    2223,
    2253,
    2254,
    2255,
    2256,
    2254,
    2254,
    2255,
    2254,
    2255,
    2255,
    2257,
    2257,
    2257,
    2257,
    2258,
    2256,
    2250,
    2257,
    2257,
    2257,
    2259,
    2254,
    2255,
    2257,
    2258,
    2259,
    2259,
    2256,
    2257,
    2258,
    2256,
    2254,
    2258,
    2254,
    2258,
    2261,
    2256,
    2255,
    2250,
    2254,
    2256,
    2256,
    2255,
    2255,
    2257,
    2254,
    2253,
    2253,
    2254,
    2254,
    2254,
    2254,
    2256,
    2245,
    2238,
    2224,
    2246,
    2250,
    2246,
    2248,
    2249,
    2250,
    2247,
    2248,
    2225,
    2223,
    2210,
    2212,
    2216,
    2218,
    2218,
    2424,
    2202,
    12,
    11,
    12,
    11,
    12,
    11,
    12,
    11,
    12,
    12,
    11,
    12,
    11,
    8,
    10,
    11,
    11,
    13,
]

/**
 * Calculate the average of every 'x' numbers in a list and return a new list with the averages.
 * @param {number[]} numbers - A list of numbers to process.
 * @param {number} y - The interval for calculating the averages.
 * @returns {number[]} A new list containing the averages of every 'x' numbers.
 */
function averageEveryXNumbers(numbers, x) {
  const averages = [];
  let sum = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  
    if ((i + 1) % x === 0) {
      averages.push(sum / x);
      sum = 0;
    }
  }

  return averages;
}  

/**
 * Get a list of strings representing the time of day for each sensor reading, assuming the last reading happened at the current time.
 * @param {number[]} sensorReadings - A list of sensor readings.
 * @param {number} y - The number of seconds between readings.
 * @returns {string[]} A list of strings representing the time of day for each sensor reading, formatted as "hh:mm AM/PM".
 */
function getReadingTimes(sensorReadings, y) {
  const currentTime = new Date();
  const readingTimes = [];
  
  for (let i = 0; i < sensorReadings.length; i++) {
    const readingTime = new Date(currentTime.getTime() - y * 1000 * (sensorReadings.length - 1 - i));
    const hours24 = readingTime.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = readingTime.getMinutes();
    const amPm = hours24 < 12 ? 'AM' : 'PM';

    const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    readingTimes.push(formattedTime);
  }
  
  return readingTimes;
}  

/**
 * Returns a new list consisting of every 'x'-th element of the input list.
 * @param {Array} list - The input list.
 * @param {number} x - The interval for selecting elements from the input list.
 * @returns {Array} A new list containing every 'x'-th element of the input list.
 */
function getEveryXthElement(list, x) {
  const resultList = [];
  
  for (let i = x - 1; i < list.length; i += x) {
    const idx = Math.floor(i)
    resultList.push(list[idx]);
  }
  
  return resultList;
}

/**
 * Generates an array of graph labels based on sensor reading times.
 * It takes an array of sensor readings and returns an array of truncated labels
 * with a fixed number of elements.
 * @param {number[]} sensorReadings - An array of sensor readings.
 * @returns {string[]} An array of graph labels with a fixed number of elements.
 */
export function getGraphLabels(sensorReadings) {
    const allReadingTimes = getReadingTimes(sensorReadings, SECONDS); 
    const NUM_LABELS = 4;
    const truncatedLabels = getEveryXthElement(allReadingTimes, allReadingTimes.length / NUM_LABELS);
    return truncatedLabels;
}

/**
 * 
 * @returns {number[]} {@link exampleAdc} list shortened by averaging the number of readings by {@link SECONDS}
 */
export const averagedAdc = averageEveryXNumbers(exampleAdc, SECONDS);

/**
 * Takes a number x and returns a new list created by multiplying all values in the existing "averagedAdc" list by x.
 * @param {number} x - The scaling factor to multiply each value in the averagedAdc list.
 * @returns {number[]} A new list with the scaled values.
 */
export function getScaledAdc(x) {
  // Assuming averagedAdc is an existing list (array) of numbers
  return averagedAdc.map(value => value * x);
}
