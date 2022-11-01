const getSearchParams = (location, string) =>  {
    return new URLSearchParams(location['search']).get(string)
}

export default getSearchParams
