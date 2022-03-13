var stateCenter = {
  AL: [32.6010112, -86.6807365],
  AK: [61.3025006, -158.7750198],
  AZ: [34.1682185, -111.930907],
  AR: [34.7519275, -92.1313784],
  CA: [37.2718745, -119.2704153],
  CO: [38.9979339, -105.550567],
  CT: [41.5187835, -72.757507],
  DE: [39.145251, -75.4189206],
  DC: [38.8993487, -77.0145666],
  FL: [28.4223337, -81.745529],
  GA: [32.6781248, -83.2229757],
  HI: [20.46, -157.505],
  ID: [45.4945756, -114.1424303],
  IL: [39.739318, -89.504139],
  IN: [39.7662195, -86.441277],
  IA: [41.9383166, -93.389798],
  KS: [38.4987789, -98.3200779],
  KY: [37.8222935, -85.7682399],
  LA: [30.9733766, -91.4299097],
  ME: [45.2185133, -69.0148656],
  MD: [38.8063524, -77.2684162],
  MA: [42.0629398, -71.718067],
  MI: [44.9435598, -86.4158049],
  MN: [46.4418595, -93.3655146],
  MS: [32.5851062, -89.8772196],
  MO: [38.3046615, -92.437099],
  MT: [46.6797995, -110.044783],
  NE: [41.5008195, -99.680902],
  NV: [38.502032, -117.0230604],
  NH: [44.0012306, -71.5799231],
  NJ: [40.1430058, -74.7311156],
  NM: [34.1662325, -106.0260685],
  NY: [40.7056258, -73.97968],
  NC: [35.2145629, -79.8912675],
  ND: [47.4678819, -100.3022655],
  OH: [40.1903624, -82.6692525],
  OK: [35.3097654, -98.7165585],
  OR: [44.1419049, -120.5380993],
  PA: [40.9945928, -77.6046984],
  RI: [41.5827282, -71.5064508],
  SC: [33.62505, -80.9470381],
  SD: [44.2126995, -100.2471641],
  TN: [35.830521, -85.9785989],
  TX: [31.1693363, -100.0768425],
  UT: [39.4997605, -111.547028],
  VT: [43.8717545, -72.4477828],
  VA: [38.0033855, -79.4587861],
  WA: [47.3292066, -120.348573],
  WV: [38.9201705, -80.1816905],
  WI: [44.7862968, -89.8267049],
  WY: [43.000325, -107.5545669]
}

async function getStateData(state) {
  let url = `https://waterwatch.usgs.gov/webservices/flows14d?region=${state}&format=json`;
  const response = await fetch(url);
  const data = await response.json();

  var totalFlow = 0;
  var totalSites = 0;
  Object.values(data.sites).forEach( site => {
    if (site.flow != null) {
      totalFlow += site.flow;
      totalSites++;
    }
  })
  if (totalSites == 0) {totalSites = 1;}
  return totalFlow/totalSites;
}
