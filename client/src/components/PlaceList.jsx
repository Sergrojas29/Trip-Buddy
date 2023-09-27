import React from 'react'
import listData from '../utils/listData';


function PlaceList() {

    return (
        <section className="resultContain">
            {listData.features.map((place, index) => {
                while (index < 25) {
                    return (
                        <div className="previewContain" key={place.properties.xid}>
                            <div id="placeName"> {place.properties.name} </div>
                            <div id="placeRating"> RATING: {place.properties.rate}</div>
                            {/* <div id="placeKind"> {place.properties.kinds} </div> */}
                        </div>
                    );
                }

            })}
        </section>
    )

}

export default PlaceList