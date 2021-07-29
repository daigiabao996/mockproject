import _ from "lodash";
export const addCasesToGEOJson = (countries, mapData) => {
  let countryList = mapData?.default?.features;
  for (let i = 0; i < countryList.length; i++) {
    let country = countryList[i];
    const covidCountry = countries.find(
      (x) => x.CountryCode === country.properties["iso-a2"]
    );
    if (covidCountry) {
      const cases = covidCountry.TotalConfirmed;
      const textCases = new Intl.NumberFormat().format(cases);
      _.setWith(country, "properties.covidCase", {
        cases: cases,
        textCases: textCases,
      });
    }
    if (!covidCountry) {
      _.setWith(country, "properties.covidCase", {
        cases: 0,
        textCases: "0",
      });
    }
  }
  return countryList;
};
