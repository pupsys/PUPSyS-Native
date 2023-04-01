export const SECONDS = 1;

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
    readings: {
        pressure: exampleAdc,
    }
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
    readings: {
        pressure: exampleAdc,
    }
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
    readings: {
        pressure: exampleAdc,
    }
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
    readings: {
        pressure: exampleAdc,
    }
  },
];


const exampleAdc = [
    11,
]