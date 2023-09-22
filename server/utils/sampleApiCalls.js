

const urlGeo = `https://api.opentripmap.com/0.1/${lang}/places/geoname?name=${locGoe}&apikey=${apiKey}`
const lang = 'en'
const locGoe = 'new%20york'
const apiKey = "5ae2e3f221c38a28845f05b692698d7c9862f1d763b5481bca8939dd"

const urlRadius = `https://api.opentripmap.com/0.1/${lang}/places/radius?radius=${radiusMeter}&lon=${lon}&lat=${lat}&src_geom=wikidata&apikey=${apiKey}`
const radiusMeter = 1000
const lon = -73.75623
const lat = 42.65258

const urlPlace = `http://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`
const xid = 'Q866789'
