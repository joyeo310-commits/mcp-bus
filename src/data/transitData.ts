import { BusStop, BusServiceDetail, TransitAlert, InterchangeBerth, BusArrivalService, BusLoad, BusDeckType } from '../types/transit';

export const BUS_STOPS: BusStop[] = [
  {
    code: '03223',
    name: 'Peninsula Plaza',
    road: 'North Bridge Rd',
    mrtTransfer: ['EW13', 'NS25'], // City Hall
    services: ['147', '190', '166', '851', '174', '12', '7'],
    coordinates: { x: 52, y: 56 },
    zone: 'Central'
  },
  {
    code: '04168',
    name: 'Clarke Quay Stn Exit E',
    road: 'Eu Tong Sen St',
    mrtTransfer: ['NE5'], // Clarke Quay
    services: ['147', '190', '166', '851', '174', '12'],
    coordinates: { x: 50, y: 58 },
    zone: 'Central'
  },
  {
    code: '09048',
    name: 'Orchard Stn / Lucky Plaza',
    road: 'Orchard Rd',
    mrtTransfer: ['NS22', 'TE14'], // Orchard
    services: ['190', '502', '65', '7', '174', '147'],
    coordinates: { x: 47, y: 50 },
    zone: 'Central'
  },
  {
    code: '10169',
    name: 'Opp Four Seasons Hotel',
    road: 'Orchard Blvd',
    mrtTransfer: ['TE13'], // Orchard Boulevard
    services: ['502', '7', '174', '190'],
    coordinates: { x: 45, y: 51 },
    zone: 'Central'
  },
  {
    code: '01012',
    name: 'Hotel Grand Pacific',
    road: 'Victoria St',
    mrtTransfer: ['EW12', 'DT14'], // Bugis
    services: ['12', '7', '174', '147', '166'],
    coordinates: { x: 54, y: 53 },
    zone: 'Central'
  },
  {
    code: '14119',
    name: 'Chinatown Stn Exit E',
    road: 'Eu Tong Sen St',
    mrtTransfer: ['NE4', 'DT19'], // Chinatown
    services: ['147', '190', '166', '851', '12'],
    coordinates: { x: 49, y: 62 },
    zone: 'Central'
  },
  {
    code: '08057',
    name: 'Dhoby Ghaut Stn Exit B',
    road: 'Orchard Rd',
    mrtTransfer: ['NS24', 'NE6', 'CC1'], // Dhoby Ghaut
    services: ['190', '65', '7', '174', '147'],
    coordinates: { x: 50, y: 52 },
    zone: 'Central'
  },
  {
    code: '28009',
    name: 'Jurong East Temp Int',
    road: 'Jurong Gateway Rd',
    mrtTransfer: ['NS1', 'EW24', 'JS1'], // Jurong East
    services: ['147', '502', '66', '97', '197', '334'],
    coordinates: { x: 26, y: 48 },
    zone: 'West'
  },
  {
    code: '17099',
    name: 'Clementi Stn Exit B',
    road: "C'wealth Ave West",
    mrtTransfer: ['EW23'], // Clementi
    services: ['147', '7', '166', '175', '282', '284'],
    coordinates: { x: 33, y: 50 },
    zone: 'West'
  },
  {
    code: '64009',
    name: 'Tampines Bus Interchange',
    road: 'Tampines Ctrl 1',
    mrtTransfer: ['EW2', 'DT32'], // Tampines
    services: ['65', '12', '291', '293', '3', '67'],
    coordinates: { x: 79, y: 44 },
    zone: 'East'
  },
  {
    code: '84009',
    name: 'Bedok Bus Interchange',
    road: 'Bedok North Ave 1',
    mrtTransfer: ['EW5'], // Bedok
    services: ['7', '65', '12', '9', '14', '60'],
    coordinates: { x: 73, y: 52 },
    zone: 'East'
  },
  {
    code: '52009',
    name: 'Toa Payoh Bus Interchange',
    road: 'Lor 6 Toa Payoh',
    mrtTransfer: ['NS19'], // Toa Payoh
    services: ['147', '88', '143', '155', '157'],
    coordinates: { x: 53, y: 39 },
    zone: 'Central'
  },
  {
    code: '64549',
    name: 'Hougang Central Interchange',
    road: 'Hougang Central',
    mrtTransfer: ['NE14', 'CR8'], // Hougang
    services: ['147', '74', '87', '151', '165'],
    coordinates: { x: 67, y: 34 },
    zone: 'North-East'
  },
  {
    code: '22009',
    name: 'Boon Lay Bus Interchange',
    road: 'Jurong West Ctrl 3',
    mrtTransfer: ['EW27', 'JS8'], // Boon Lay
    services: ['174', '502', '179', '180', '194', '243'],
    coordinates: { x: 18, y: 49 },
    zone: 'West'
  }
];

export const BUS_SERVICES: Record<string, BusServiceDetail> = {
  '147': {
    serviceNo: '147',
    operator: 'SBS Transit',
    category: 'Trunk',
    origin: 'Hougang Central Int',
    destination: 'Jurong East Int',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Jurong East Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:45',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:45',
        peakFrequency: '4 - 7 mins',
        offPeakFrequency: '8 - 12 mins',
        stops: [
          { sequence: 1, stopCode: '64549', stopName: 'Hougang Central Int', roadName: 'Hougang Central', distanceKm: 0.0, mrtTransfer: ['NE14'] },
          { sequence: 2, stopCode: '64109', stopName: 'Blk 831', roadName: 'Hougang Ave 10', distanceKm: 1.2 },
          { sequence: 5, stopCode: '66011', stopName: 'Kovan Stn Exit C', roadName: 'Upper Serangoon Rd', distanceKm: 4.1, mrtTransfer: ['NE13'] },
          { sequence: 11, stopCode: '66189', stopName: 'Serangoon Stn Exit H', roadName: 'Upper Serangoon Rd', distanceKm: 7.8, hasBusNow: true, busPlate: 'SBS3421K', busDeck: 'DD', busLoad: 'SEA', mrtTransfer: ['NE12', 'CC13'] },
          { sequence: 18, stopCode: '01012', stopName: 'Hotel Grand Pacific', roadName: 'Victoria St', distanceKm: 13.2, mrtTransfer: ['EW12', 'DT14'] },
          { sequence: 20, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 14.5, hasBusNow: true, busPlate: 'SG5122B', busDeck: 'DD', busLoad: 'SDA', mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 22, stopCode: '04168', stopName: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 15.6, mrtTransfer: ['NE5'] },
          { sequence: 24, stopCode: '14119', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 16.7, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 31, stopCode: '10041', stopName: 'Blk 201', roadName: 'Jalan Bukit Merah', distanceKm: 21.0, hasBusNow: true, busPlate: 'SBS8891H', busDeck: 'SD', busLoad: 'SEA' },
          { sequence: 38, stopCode: '11169', stopName: 'Queenstown Stn Exit B', roadName: 'Commonwealth Ave', distanceKm: 25.3, mrtTransfer: ['EW19'] },
          { sequence: 44, stopCode: '17099', stopName: 'Clementi Stn Exit B', roadName: "C'wealth Ave West", distanceKm: 29.8, mrtTransfer: ['EW23'] },
          { sequence: 48, stopCode: '28009', stopName: 'Jurong East Temp Int', roadName: 'Jurong Gateway Rd', distanceKm: 34.2, mrtTransfer: ['NS1', 'EW24'] }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Hougang Central Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:45',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:45',
        peakFrequency: '5 - 8 mins',
        offPeakFrequency: '9 - 13 mins',
        stops: [
          { sequence: 1, stopCode: '28009', stopName: 'Jurong East Temp Int', roadName: 'Jurong Gateway Rd', distanceKm: 0.0, mrtTransfer: ['NS1', 'EW24'] },
          { sequence: 5, stopCode: '17099', stopName: 'Clementi Stn Exit A', roadName: "C'wealth Ave West", distanceKm: 4.4, mrtTransfer: ['EW23'] },
          { sequence: 17, stopCode: '14119', stopName: 'Chinatown Stn Exit E', roadName: 'New Bridge Rd', distanceKm: 17.5, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 20, stopCode: '04168', stopName: 'Clarke Quay Stn', roadName: 'New Bridge Rd', distanceKm: 18.6, hasBusNow: true, busPlate: 'SG5018Y', busDeck: 'DD', busLoad: 'LSD', mrtTransfer: ['NE5'] },
          { sequence: 22, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 19.7, mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 35, stopCode: '66189', stopName: 'Serangoon Stn', roadName: 'Upper Serangoon Rd', distanceKm: 26.4, mrtTransfer: ['NE12', 'CC13'] },
          { sequence: 48, stopCode: '64549', stopName: 'Hougang Central Int', roadName: 'Hougang Central', distanceKm: 34.2, mrtTransfer: ['NE14'] }
        ]
      }
    ]
  },

  '190': {
    serviceNo: '190',
    operator: 'SMRT',
    category: 'Trunk',
    origin: 'Choa Chu Kang Int',
    destination: 'Kampong Bahru Ter',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Kampong Bahru Ter',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:40',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:40',
        peakFrequency: '3 - 6 mins',
        offPeakFrequency: '6 - 9 mins',
        stops: [
          { sequence: 1, stopCode: '44009', stopName: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', distanceKm: 0.0, mrtTransfer: ['NS4', 'BP1'] },
          { sequence: 8, stopCode: '44259', stopName: 'Bukit Panjang Stn Exit A', roadName: 'Upper Bukit Timah Rd', distanceKm: 6.2, mrtTransfer: ['DT1', 'BP6'] },
          { sequence: 14, stopCode: '40081', stopName: 'Stevens Stn Exit 2', roadName: 'Whitley Rd', distanceKm: 14.5, mrtTransfer: ['DT10', 'TE11'] },
          { sequence: 17, stopCode: '09048', stopName: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 17.8, hasBusNow: true, busPlate: 'SMB5890A', busDeck: 'BD', busLoad: 'SDA', mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 19, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 19.3, mrtTransfer: ['NS24', 'NE6', 'CC1'] },
          { sequence: 21, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 21.0, mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 23, stopCode: '04168', stopName: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 22.1, hasBusNow: true, busPlate: 'SMB3112G', busDeck: 'DD', busLoad: 'SEA', mrtTransfer: ['NE5'] },
          { sequence: 25, stopCode: '14119', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 23.3, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 29, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 26.5 }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Choa Chu Kang Int',
        firstBusWeekday: '05:45',
        lastBusWeekday: '23:55',
        firstBusWeekend: '06:00',
        lastBusWeekend: '23:55',
        peakFrequency: '4 - 7 mins',
        offPeakFrequency: '7 - 10 mins',
        stops: [
          { sequence: 1, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 0.0 },
          { sequence: 4, stopCode: '14119', stopName: 'Chinatown Stn', roadName: 'New Bridge Rd', distanceKm: 3.2, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 6, stopCode: '04168', stopName: 'Clarke Quay Stn', roadName: 'New Bridge Rd', distanceKm: 4.4, mrtTransfer: ['NE5'] },
          { sequence: 11, stopCode: '09048', stopName: 'Opp Orchard Stn', roadName: 'Orchard Blvd', distanceKm: 8.7, mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 29, stopCode: '44009', stopName: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', distanceKm: 26.5, mrtTransfer: ['NS4', 'BP1'] }
        ]
      }
    ]
  },

  '502': {
    serviceNo: '502',
    operator: 'SBS Transit',
    category: 'Express',
    origin: 'Soon Lee Depot',
    destination: 'Marina Centre Ter',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Marina Centre Ter (Express via AYE)',
        firstBusWeekday: '05:45',
        lastBusWeekday: '23:30',
        firstBusWeekend: '06:00',
        lastBusWeekend: '23:30',
        peakFrequency: '7 - 12 mins',
        offPeakFrequency: '12 - 16 mins',
        stops: [
          { sequence: 1, stopCode: '22009', stopName: 'Boon Lay Bus Interchange', roadName: 'Jurong West Ctrl 3', distanceKm: 0.0, mrtTransfer: ['EW27'] },
          { sequence: 8, stopCode: '28009', stopName: 'Jurong East Temp Int', roadName: 'Jurong Gateway Rd', distanceKm: 7.2, mrtTransfer: ['NS1', 'EW24'] },
          { sequence: 14, stopCode: '10169', stopName: 'Opp Four Seasons Hotel', roadName: 'Orchard Blvd', distanceKm: 19.4, hasBusNow: true, busPlate: 'SBS3982A', busDeck: 'DD', busLoad: 'SEA', mrtTransfer: ['TE13'] },
          { sequence: 16, stopCode: '09048', stopName: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 20.8, mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 19, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 22.3, mrtTransfer: ['NS24', 'NE6'] },
          { sequence: 23, stopCode: '02099', stopName: 'Marina Centre Ter', roadName: 'Raffles Ave', distanceKm: 25.1, mrtTransfer: ['CC4', 'DT15'] }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Soon Lee / Pioneer (Express via AYE)',
        firstBusWeekday: '06:30',
        lastBusWeekday: '00:00',
        firstBusWeekend: '06:45',
        lastBusWeekend: '00:00',
        peakFrequency: '8 - 12 mins',
        offPeakFrequency: '12 - 16 mins',
        stops: [
          { sequence: 1, stopCode: '02099', stopName: 'Marina Centre Ter', roadName: 'Raffles Ave', distanceKm: 0.0, mrtTransfer: ['CC4', 'DT15'] },
          { sequence: 6, stopCode: '10169', stopName: 'Four Seasons Hotel', roadName: 'Orchard Blvd', distanceKm: 5.8, mrtTransfer: ['TE13'] },
          { sequence: 16, stopCode: '28009', stopName: 'Jurong East Temp Int', roadName: 'Jurong Gateway Rd', distanceKm: 18.0, mrtTransfer: ['NS1', 'EW24'] },
          { sequence: 23, stopCode: '22009', stopName: 'Boon Lay Bus Interchange', roadName: 'Jurong West Ctrl 3', distanceKm: 25.1, mrtTransfer: ['EW27'] }
        ]
      }
    ]
  },

  '65': {
    serviceNo: '65',
    operator: 'SBS Transit',
    category: 'Trunk',
    origin: 'Tampines Int',
    destination: 'HarbourFront Int',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards HarbourFront Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:30',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:30',
        peakFrequency: '5 - 8 mins',
        offPeakFrequency: '8 - 12 mins',
        stops: [
          { sequence: 1, stopCode: '64009', stopName: 'Tampines Bus Interchange', roadName: 'Tampines Ctrl 1', distanceKm: 0.0, mrtTransfer: ['EW2', 'DT32'] },
          { sequence: 6, stopCode: '84009', stopName: 'Bedok Bus Interchange', roadName: 'Bedok North Ave 1', distanceKm: 5.6, hasBusNow: true, busPlate: 'SBS3402P', busDeck: 'DD', busLoad: 'SEA', mrtTransfer: ['EW5'] },
          { sequence: 18, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 18.2, mrtTransfer: ['NS24', 'NE6', 'CC1'] },
          { sequence: 21, stopCode: '09048', stopName: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 20.0, hasBusNow: true, busPlate: 'SG5641T', busDeck: 'DD', busLoad: 'SDA', mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 32, stopCode: '14141', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', distanceKm: 27.5, mrtTransfer: ['NE1', 'CC29'] }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Tampines Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:30',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:30',
        peakFrequency: '5 - 8 mins',
        offPeakFrequency: '8 - 12 mins',
        stops: [
          { sequence: 1, stopCode: '14141', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', distanceKm: 0.0, mrtTransfer: ['NE1', 'CC29'] },
          { sequence: 12, stopCode: '09048', stopName: 'Opp Orchard Stn', roadName: 'Orchard Blvd', distanceKm: 7.5, mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 27, stopCode: '84009', stopName: 'Bedok Bus Interchange', roadName: 'Bedok North Ave 1', distanceKm: 21.9, mrtTransfer: ['EW5'] },
          { sequence: 32, stopCode: '64009', stopName: 'Tampines Bus Interchange', roadName: 'Tampines Ctrl 1', distanceKm: 27.5, mrtTransfer: ['EW2', 'DT32'] }
        ]
      }
    ]
  },

  '12': {
    serviceNo: '12',
    operator: 'Go-Ahead',
    category: 'Trunk',
    origin: 'Pasir Ris Int',
    destination: 'Kampong Bahru Ter',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Kampong Bahru Ter',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:45',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:45',
        peakFrequency: '5 - 8 mins',
        offPeakFrequency: '8 - 11 mins',
        stops: [
          { sequence: 1, stopCode: '77009', stopName: 'Pasir Ris Int', roadName: 'Pasir Ris Dr 3', distanceKm: 0.0, mrtTransfer: ['EW1'] },
          { sequence: 8, stopCode: '64009', stopName: 'Tampines Bus Interchange', roadName: 'Tampines Ctrl 1', distanceKm: 5.1, mrtTransfer: ['EW2', 'DT32'] },
          { sequence: 16, stopCode: '84009', stopName: 'Bedok Bus Interchange', roadName: 'Bedok North Ave 1', distanceKm: 11.2, mrtTransfer: ['EW5'] },
          { sequence: 24, stopCode: '01012', stopName: 'Hotel Grand Pacific', roadName: 'Victoria St', distanceKm: 19.8, hasBusNow: true, busPlate: 'SG1012K', busDeck: 'DD', busLoad: 'SEA', mrtTransfer: ['EW12', 'DT14'] },
          { sequence: 26, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 21.1, mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 28, stopCode: '04168', stopName: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 22.2, mrtTransfer: ['NE5'] },
          { sequence: 30, stopCode: '14119', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 23.4, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 34, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 26.8 }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Pasir Ris Int',
        firstBusWeekday: '05:40',
        lastBusWeekday: '23:55',
        firstBusWeekend: '05:55',
        lastBusWeekend: '23:55',
        peakFrequency: '6 - 9 mins',
        offPeakFrequency: '9 - 12 mins',
        stops: [
          { sequence: 1, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 0.0 },
          { sequence: 5, stopCode: '14119', stopName: 'Chinatown Stn', roadName: 'New Bridge Rd', distanceKm: 3.4, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 9, stopCode: '01012', stopName: 'Opp Hotel Grand Pacific', roadName: 'Victoria St', distanceKm: 7.0, mrtTransfer: ['EW12', 'DT14'] },
          { sequence: 34, stopCode: '77009', stopName: 'Pasir Ris Int', roadName: 'Pasir Ris Dr 3', distanceKm: 26.8, mrtTransfer: ['EW1'] }
        ]
      }
    ]
  },

  '7': {
    serviceNo: '7',
    operator: 'SBS Transit',
    category: 'Trunk',
    origin: 'Bedok Int',
    destination: 'Clementi Int',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Clementi Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:45',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:45',
        peakFrequency: '4 - 7 mins',
        offPeakFrequency: '7 - 10 mins',
        stops: [
          { sequence: 1, stopCode: '84009', stopName: 'Bedok Bus Interchange', roadName: 'Bedok North Ave 1', distanceKm: 0.0, mrtTransfer: ['EW5'] },
          { sequence: 15, stopCode: '01012', stopName: 'Hotel Grand Pacific', roadName: 'Victoria St', distanceKm: 11.2, mrtTransfer: ['EW12', 'DT14'] },
          { sequence: 17, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 12.8, hasBusNow: true, busPlate: 'SBS3201M', busDeck: 'DD', busLoad: 'SEA', mrtTransfer: ['NS24', 'NE6'] },
          { sequence: 19, stopCode: '09048', stopName: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 14.1, mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 21, stopCode: '10169', stopName: 'Opp Four Seasons Hotel', roadName: 'Orchard Blvd', distanceKm: 15.3, mrtTransfer: ['TE13'] },
          { sequence: 28, stopCode: '11401', stopName: 'Holland Village Stn', roadName: 'Holland Ave', distanceKm: 20.4, mrtTransfer: ['CC21'] },
          { sequence: 34, stopCode: '17099', stopName: 'Clementi Stn Exit B', roadName: "C'wealth Ave West", distanceKm: 25.4, mrtTransfer: ['EW23'] }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Bedok Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:45',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:45',
        peakFrequency: '4 - 7 mins',
        offPeakFrequency: '7 - 10 mins',
        stops: [
          { sequence: 1, stopCode: '17099', stopName: 'Clementi Stn Exit A', roadName: "C'wealth Ave West", distanceKm: 0.0, mrtTransfer: ['EW23'] },
          { sequence: 15, stopCode: '09048', stopName: 'Opp Orchard Stn', roadName: 'Orchard Blvd', distanceKm: 11.3, mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 34, stopCode: '84009', stopName: 'Bedok Bus Interchange', roadName: 'Bedok North Ave 1', distanceKm: 25.4, mrtTransfer: ['EW5'] }
        ]
      }
    ]
  },

  '174': {
    serviceNo: '174',
    operator: 'SBS Transit',
    category: 'Trunk',
    origin: 'Boon Lay Int',
    destination: 'Kampong Bahru Ter',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Kampong Bahru Ter',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:30',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:30',
        peakFrequency: '6 - 9 mins',
        offPeakFrequency: '9 - 13 mins',
        stops: [
          { sequence: 1, stopCode: '22009', stopName: 'Boon Lay Bus Interchange', roadName: 'Jurong West Ctrl 3', distanceKm: 0.0, mrtTransfer: ['EW27'] },
          { sequence: 18, stopCode: '10169', stopName: 'Opp Four Seasons Hotel', roadName: 'Orchard Blvd', distanceKm: 19.8, mrtTransfer: ['TE13'] },
          { sequence: 20, stopCode: '09048', stopName: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 21.2, mrtTransfer: ['NS22', 'TE14'] },
          { sequence: 23, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 22.7, mrtTransfer: ['NS24', 'NE6'] },
          { sequence: 25, stopCode: '01012', stopName: 'Hotel Grand Pacific', roadName: 'Victoria St', distanceKm: 24.1, mrtTransfer: ['EW12', 'DT14'] },
          { sequence: 27, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 25.3, mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 29, stopCode: '04168', stopName: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 26.5, mrtTransfer: ['NE5'] },
          { sequence: 35, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 30.1 }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Boon Lay Int',
        firstBusWeekday: '05:45',
        lastBusWeekday: '23:45',
        firstBusWeekend: '06:00',
        lastBusWeekend: '23:45',
        peakFrequency: '6 - 9 mins',
        offPeakFrequency: '9 - 13 mins',
        stops: [
          { sequence: 1, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 0.0 },
          { sequence: 7, stopCode: '04168', stopName: 'Clarke Quay Stn', roadName: 'New Bridge Rd', distanceKm: 3.6, mrtTransfer: ['NE5'] },
          { sequence: 35, stopCode: '22009', stopName: 'Boon Lay Bus Interchange', roadName: 'Jurong West Ctrl 3', distanceKm: 30.1, mrtTransfer: ['EW27'] }
        ]
      }
    ]
  },

  '166': {
    serviceNo: '166',
    operator: 'SBS Transit',
    category: 'Trunk',
    origin: 'Ang Mo Kio Int',
    destination: 'Clementi Int',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Clementi Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:30',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:30',
        peakFrequency: '5 - 9 mins',
        offPeakFrequency: '9 - 13 mins',
        stops: [
          { sequence: 1, stopCode: '54009', stopName: 'Ang Mo Kio Bus Interchange', roadName: 'Ang Mo Kio Ave 8', distanceKm: 0.0, mrtTransfer: ['NS16'] },
          { sequence: 12, stopCode: '01012', stopName: 'Hotel Grand Pacific', roadName: 'Victoria St', distanceKm: 12.3, mrtTransfer: ['EW12', 'DT14'] },
          { sequence: 14, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 13.5, mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 16, stopCode: '04168', stopName: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 14.6, mrtTransfer: ['NE5'] },
          { sequence: 18, stopCode: '14119', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 15.8, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 35, stopCode: '17099', stopName: 'Clementi Stn Exit B', roadName: "C'wealth Ave West", distanceKm: 28.9, mrtTransfer: ['EW23'] }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Ang Mo Kio Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:30',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:30',
        peakFrequency: '5 - 9 mins',
        offPeakFrequency: '9 - 13 mins',
        stops: [
          { sequence: 1, stopCode: '17099', stopName: 'Clementi Stn Exit A', roadName: "C'wealth Ave West", distanceKm: 0.0, mrtTransfer: ['EW23'] },
          { sequence: 18, stopCode: '14119', stopName: 'Chinatown Stn', roadName: 'New Bridge Rd', distanceKm: 13.1, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 35, stopCode: '54009', stopName: 'Ang Mo Kio Bus Interchange', roadName: 'Ang Mo Kio Ave 8', distanceKm: 28.9, mrtTransfer: ['NS16'] }
        ]
      }
    ]
  },

  '851': {
    serviceNo: '851',
    operator: 'Tower Transit',
    category: 'Trunk',
    origin: 'Yishun Int',
    destination: 'Bukit Merah Int',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Towards Bukit Merah Int',
        firstBusWeekday: '05:30',
        lastBusWeekday: '23:45',
        firstBusWeekend: '05:45',
        lastBusWeekend: '23:45',
        peakFrequency: '5 - 8 mins',
        offPeakFrequency: '8 - 12 mins',
        stops: [
          { sequence: 1, stopCode: '59009', stopName: 'Yishun Bus Interchange', roadName: 'Yishun Ave 2', distanceKm: 0.0, mrtTransfer: ['NS13'] },
          { sequence: 19, stopCode: '03223', stopName: 'Peninsula Plaza', roadName: 'North Bridge Rd', distanceKm: 17.2, mrtTransfer: ['EW13', 'NS25'] },
          { sequence: 21, stopCode: '04168', stopName: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 18.3, mrtTransfer: ['NE5'] },
          { sequence: 23, stopCode: '14119', stopName: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', distanceKm: 19.5, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 30, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', distanceKm: 24.5 }
        ]
      },
      {
        directionNumber: 2,
        directionLabel: 'Towards Yishun Int',
        firstBusWeekday: '05:45',
        lastBusWeekday: '00:00',
        firstBusWeekend: '06:00',
        lastBusWeekend: '00:00',
        peakFrequency: '5 - 8 mins',
        offPeakFrequency: '8 - 12 mins',
        stops: [
          { sequence: 1, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', distanceKm: 0.0 },
          { sequence: 8, stopCode: '14119', stopName: 'Chinatown Stn', roadName: 'New Bridge Rd', distanceKm: 5.0, mrtTransfer: ['NE4', 'DT19'] },
          { sequence: 30, stopCode: '59009', stopName: 'Yishun Bus Interchange', roadName: 'Yishun Ave 2', distanceKm: 24.5, mrtTransfer: ['NS13'] }
        ]
      }
    ]
  },

  '291': {
    serviceNo: '291',
    operator: 'SBS Transit',
    category: 'Feeder',
    origin: 'Tampines Int',
    destination: 'Tampines Street Loop',
    directions: [
      {
        directionNumber: 1,
        directionLabel: 'Tampines East & West Loop',
        firstBusWeekday: '05:15',
        lastBusWeekday: '01:05',
        firstBusWeekend: '05:30',
        lastBusWeekend: '01:05',
        peakFrequency: '2 - 5 mins',
        offPeakFrequency: '5 - 8 mins',
        stops: [
          { sequence: 1, stopCode: '64009', stopName: 'Tampines Bus Interchange', roadName: 'Tampines Ctrl 1', distanceKm: 0.0, mrtTransfer: ['EW2', 'DT32'] },
          { sequence: 4, stopCode: '76119', stopName: 'Blk 216', roadName: 'Tampines Ave 4', distanceKm: 2.1 },
          { sequence: 9, stopCode: '76229', stopName: 'Tampines JC', roadName: 'Tampines Ave 8', distanceKm: 5.4 },
          { sequence: 16, stopCode: '64009', stopName: 'Tampines Bus Interchange', roadName: 'Tampines Ctrl 1', distanceKm: 10.2, mrtTransfer: ['EW2', 'DT32'] }
        ]
      }
    ]
  }
};

export const TRANSIT_ALERTS: TransitAlert[] = [
  {
    id: 'ALT-2026-041',
    title: 'Bus Route Diversion: Marina Bay & Civic District',
    category: 'Diversion',
    severity: 'medium',
    timestamp: 'Today, 06:00 SGT',
    validPeriod: 'Oct 06 - Oct 12 (Night operations 20:00 - 05:00)',
    affectedServices: ['190', '502', '147', '12', '7'],
    summary: 'Temporary diversion along North Bridge Rd & Raffles Ave due to civic infrastructure upgrades. 2 stops skipped.',
    details: 'Services 190, 502, and 147 will skip Bus Stop 02049 (Raffles Hotel) between 20:00 and 05:00. Commuters are advised to alight at Stop 03223 (Peninsula Plaza) or City Hall MRT.',
    affectedStops: ['02049', '02059']
  },
  {
    id: 'ALT-2026-039',
    title: 'Sengkang & Punggol LRT Maintenance: Free Regular Bus Travel',
    category: 'Disruption',
    severity: 'high',
    timestamp: 'Yesterday, 22:30 SGT',
    validPeriod: 'Until 23:59 SGT tonight',
    affectedServices: ['147', '291', '88'],
    summary: 'Free travel on designated SBS Transit feeder and trunk services parallel to LRT loop during track maintenance.',
    details: 'Commuters tapping in at affected stations will receive auto fare waiver. Supplementary Double Deck buses deployed on Service 147.',
    affectedStops: ['64549']
  },
  {
    id: 'ALT-2026-038',
    title: 'Jurong East Bus Interchange Berth Relocation',
    category: 'Berth Update',
    severity: 'info',
    timestamp: 'Effective 1st of month',
    validPeriod: 'Permanent arrangement',
    affectedServices: ['502', '147', '66'],
    summary: 'Service 502 boarding relocated from Berth B3 to Berth B1 for faster passenger flow.',
    details: 'New wheelchair-accessible boarding ramp installed at Berth B1 with real-time audio guidance for visually impaired commuters.',
    affectedStops: ['28009']
  },
  {
    id: 'ALT-2026-035',
    title: 'Festive Eve Bus Operating Hours Extension',
    category: 'Festive Extension',
    severity: 'info',
    timestamp: 'Updated this week',
    validPeriod: 'Upcoming public holidays',
    affectedServices: ['147', '190', '65', '12', '7', '174', '166', '851'],
    summary: 'Last bus departure timings from all major interchanges extended until 01:30 hrs.',
    details: 'Connecting with the last trains departing City Hall & Outram Park MRT stations. Additional trips added between 23:00 and 01:30.'
  }
];

export const INTERCHANGE_BERTHS: InterchangeBerth[] = [
  {
    interchangeName: 'Jurong East Bus Interchange',
    interchangeCode: '28009',
    zone: 'West Region',
    berths: [
      { berthNumber: 'Berth B1', services: ['502', '502A'], wheelchairBoardingPoint: 'B1 Ramp South', amenitiesNearby: 'LTA Passenger Service Office, MRT Exit A' },
      { berthNumber: 'Berth B2', services: ['147', '147A'], wheelchairBoardingPoint: 'B2 Central', amenitiesNearby: 'Water Cooler, Farecard Top-up Kiosks' },
      { berthNumber: 'Berth B3', services: ['66', '198'], wheelchairBoardingPoint: 'B3 North', amenitiesNearby: 'Tactile Paving to MRT Gantry' },
      { berthNumber: 'Berth B4', services: ['97', '97e', '197'], wheelchairBoardingPoint: 'B4 End', amenitiesNearby: 'Public Washroom (Wheelchair-accessible)' },
      { berthNumber: 'Berth B5', services: ['334', '335', '333'], wheelchairBoardingPoint: 'B5 Feeder Bay', amenitiesNearby: 'TransitLink Ticket Office' }
    ]
  },
  {
    interchangeName: 'Tampines Bus Interchange',
    interchangeCode: '64009',
    zone: 'East Region',
    berths: [
      { berthNumber: 'Berth A1', services: ['65', '67'], wheelchairBoardingPoint: 'A1 North Bay', amenitiesNearby: 'Direct shelter to Tampines MRT (East-West Line)' },
      { berthNumber: 'Berth A2', services: ['12', '12e'], wheelchairBoardingPoint: 'A2 Center Ramp', amenitiesNearby: 'Baby Care Room, NTUC FairPrice entrance' },
      { berthNumber: 'Berth A3', services: ['291', '293'], wheelchairBoardingPoint: 'A3 Feeder Loop', amenitiesNearby: 'Priority Queuing Zone, High-volume boarding' },
      { berthNumber: 'Berth B1', services: ['3', '27', '34'], wheelchairBoardingPoint: 'B1 Airport Express', amenitiesNearby: 'Airport Luggage Drop Information' },
      { berthNumber: 'Berth B2', services: ['10', '19', '37'], wheelchairBoardingPoint: 'B2 East Wing', amenitiesNearby: 'SMRT & SBS Transit Shared Lounge' }
    ]
  },
  {
    interchangeName: 'Bedok Bus Interchange',
    interchangeCode: '84009',
    zone: 'East Region',
    berths: [
      { berthNumber: 'Berth B1', services: ['7', '7B'], wheelchairBoardingPoint: 'B1 Air-Con Bay', amenitiesNearby: 'Direct escalator to Bedok Mall & MRT' },
      { berthNumber: 'Berth B2', services: ['65'], wheelchairBoardingPoint: 'B2 Priority Gate', amenitiesNearby: 'ComfortDelGro Taxi Stand' },
      { berthNumber: 'Berth B3', services: ['12'], wheelchairBoardingPoint: 'B3 Mid Bay', amenitiesNearby: 'AED Station, Drinking Fountain' },
      { berthNumber: 'Berth B4', services: ['9', '14', '60'], wheelchairBoardingPoint: 'B4 Long-Haul', amenitiesNearby: 'Customer Care Helpdesk' }
    ]
  },
  {
    interchangeName: 'Toa Payoh Bus Interchange',
    interchangeCode: '52009',
    zone: 'Central Region',
    berths: [
      { berthNumber: 'Berth 1', services: ['147'], wheelchairBoardingPoint: 'Berth 1 Lift Access', amenitiesNearby: 'Direct link to HDB Hub & Toa Payoh MRT' },
      { berthNumber: 'Berth 2', services: ['88', '143'], wheelchairBoardingPoint: 'Berth 2 Center', amenitiesNearby: 'TransitLink Kiosk, PosB ATM' },
      { berthNumber: 'Berth 3', services: ['155', '157'], wheelchairBoardingPoint: 'Berth 3 Ramp', amenitiesNearby: 'Air-conditioned waiting concourse' }
    ]
  },
  {
    interchangeName: 'Boon Lay Bus Interchange',
    interchangeCode: '22009',
    zone: 'West Region',
    berths: [
      { berthNumber: 'Berth A1', services: ['174', '174e'], wheelchairBoardingPoint: 'A1 Ramp', amenitiesNearby: 'Direct sheltered walkway to Jurong Point Mall' },
      { berthNumber: 'Berth A2', services: ['502'], wheelchairBoardingPoint: 'A2 Express Bay', amenitiesNearby: 'MRT Linkbridge, Fast boarding gate' },
      { berthNumber: 'Berth B1', services: ['179', '179A', '199'], wheelchairBoardingPoint: 'B1 NTU Student Bay', amenitiesNearby: 'Automated card reader lines' }
    ]
  }
];

// Helper to generate dynamic arrivals for any stop
export function getLiveArrivalsForStop(stopCode: string, tickOffset: number = 0): BusArrivalService[] {
  const stop = BUS_STOPS.find((s) => s.code === stopCode) || BUS_STOPS[0];
  const servicesCalling = stop.services;

  return servicesCalling.map((svcNo, index) => {
    const detail = BUS_SERVICES[svcNo];
    const category = detail ? detail.category : 'Trunk';
    const operator = detail ? detail.operator : 'SBS Transit';
    const destinationName = detail?.directions[0]?.stops[detail.directions[0].stops.length - 1]?.stopName || 'Terminal';
    const destinationCode = detail?.directions[0]?.stops[detail.directions[0].stops.length - 1]?.stopCode || '00000';

    // Algorithmic arrival variation based on service & tick
    const baseMin1 = Math.max(0, ((index * 3 + Math.floor(tickOffset / 2)) % 7));
    const baseMin2 = baseMin1 + 5 + ((index * 2) % 6);
    const baseMin3 = baseMin2 + 7 + ((index * 4) % 8);

    // Realistic vehicle models & plates
    const sbsPlates = ['SBS3421K', 'SG5122B', 'SBS8891H', 'SBS3982A', 'SG5641T', 'SBS3201M', 'SG1012K', 'SBS6789D', 'SG4001B'];
    const plate1 = sbsPlates[(index * 2 + tickOffset) % sbsPlates.length];
    const plate2 = sbsPlates[(index * 2 + 1 + tickOffset) % sbsPlates.length];
    const plate3 = sbsPlates[(index * 2 + 3 + tickOffset) % sbsPlates.length];

    const loads: BusLoad[] = ['SEA', 'SEA', 'SDA', 'SEA', 'LSD', 'SDA'];
    const load1 = loads[(index + tickOffset) % loads.length];
    const load2 = loads[(index + tickOffset + 1) % loads.length];
    const load3 = loads[(index + tickOffset + 2) % loads.length];

    const decks: BusDeckType[] = ['DD', 'DD', 'SD', 'DD', 'SD'];
    const deck1 = svcNo === '502' || svcNo === '147' || svcNo === '65' ? 'DD' : decks[(index + tickOffset) % decks.length];
    const deck2 = decks[(index + 1) % decks.length];
    const deck3 = decks[(index + 2) % decks.length];

    return {
      serviceNo: svcNo,
      operator,
      category,
      originCode: detail?.directions[0]?.stops[0]?.stopCode || stopCode,
      destinationCode,
      destinationName,
      nextBus: {
        estimatedMinutes: baseMin1,
        load: load1,
        deck: deck1,
        wab: true,
        plateNumber: plate1,
        vehicleModel: deck1 === 'DD' ? 'Volvo B9TL Wright Eclipse Gemini 2' : 'Mercedes-Benz Citaro O530',
        distanceMetres: baseMin1 === 0 ? 80 : baseMin1 * 420
      },
      nextBus2: {
        estimatedMinutes: baseMin2,
        load: load2,
        deck: deck2,
        wab: true,
        plateNumber: plate2,
        vehicleModel: deck2 === 'DD' ? 'MAN A95 ND323F Double Deck' : 'Scania K230UB',
        distanceMetres: baseMin2 * 450
      },
      nextBus3: {
        estimatedMinutes: baseMin3,
        load: load3,
        deck: deck3,
        wab: true,
        plateNumber: plate3,
        vehicleModel: deck3 === 'DD' ? 'Volvo B9TL Wright' : 'Mercedes-Benz Citaro',
        distanceMetres: baseMin3 * 480
      }
    };
  });
}
