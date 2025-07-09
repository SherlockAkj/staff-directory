export const fetchCities = async () => {
  const res = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
  const data = await res.json();
  const countries = [...new Set(data.map(city => city.country))].sort();
  const statesByCountry = data.reduce((acc, city) => {
    if (!acc[city.country]) acc[city.country] = [];
    if (!acc[city.country].includes(city.name)) acc[city.country].push(city.name);
    return acc;
  }, {});
  return { countries, statesByCountry };
};