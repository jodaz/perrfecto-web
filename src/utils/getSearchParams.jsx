/**
 * Return parameter found in location object search
 * @param {location object} location
 * @param {*} string param in URL
 * @returns
 */
const getSearchParams = (location, string) =>  {
    return new URLSearchParams(location['search']).get(string)
}

export default getSearchParams
