class GeoApiCall {
    
    async getlocation(string) {
        try {
            // const url = `https://geocoding-api.open-meteo.com/v1/search?name=${string}&count=10&language=en&format=json`;
            const url = 'https://geocoding-api.open-meteo.com/v1/search?name=Austin&count=10&language=en&format=json';
            const data   = await fetch(url);
            const locationData = await data.json()
            console.log(locationData)
        } catch (error) {
            alert(error)
        }
    }
}


export default new GeoApiCall();