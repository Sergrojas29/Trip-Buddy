import React from 'react'
import listData from '../utils/listData';


function PlaceList() {

    return (
        <section className="resultContain">
            {listData.features.map((place, index) => {
                while (index < 25) {
                    return (
                        <a className="previewContain" key={place.properties.xid} href='#placeTitle' onClick={() => console.log('hello')} >
                            <div id="placeName" maxLength="15"> {place.properties.name} </div>
                            <div id="placeRating"> RATING: {place.properties.rate}</div>
                        </a>
                    );
                }

            })}
        </section>
    )

}

export default PlaceList