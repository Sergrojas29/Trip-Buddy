import React from 'react'
import listData from '../utils/listData';


function PlaceList() {

    return (
        <section className="resultContain">
            {listData.features.map((place, index) => {
                while (index < 25) {
                    return (
                        <button className="previewContain" key={place.properties.xid}>
                            <div id="placeName" maxLength="15"> {place.properties.name} </div>
                            <div id="placeRating"> RATING: {place.properties.rate}</div>
                            {/* <div id="placeKind"> {place.properties.kinds} </div> */}
                        </button>
                    );
                }

            })}
        </section>
    )

}

export default PlaceList