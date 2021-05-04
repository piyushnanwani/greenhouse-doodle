export function updateBrowserUrl(start, end, parameter, countryListStr) {
    window.history.replaceState(
      null,
      'New Page Title',
      `chart?start=${start}&end=${end}&parameter=${parameter}&location=${countryListStr}`
    );
}