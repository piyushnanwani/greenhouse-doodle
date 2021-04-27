export function updateBrowserUrl(start, end, parameter, countryListStr, mapYear, mapParameter) {
    window.history.replaceState(
      null,
      'New Page Title',
      `chart?start=${start}&end=${end}&parameter=${parameter}&location=${countryListStr.replace(
        ',',
        '%2b'
      )}&mapYear=${mapYear}&mapParameter=${mapParameter}`
    );
}