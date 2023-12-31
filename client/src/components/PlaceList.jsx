import React from 'react'
import listData from '../utils/listData';


function PlaceList() {

    return (
        <section className="resultContain">
            {listData.features.map((place, index) => {
                while (index < 25) {
                    return (
                        <a className="previewContain" key={place.properties.xid} href='#placeTitle' id={place.properties.xid} onClick={(e) => console.log(e.target.id)} >
                            <div className="placeName" maxLength="15" id={place.properties.xid} > {place.properties.name} </div>
                            <div className="placeRating" id={place.properties.xid} > RATING: {place.properties.rate}</div>
                        </a>
                    );
                }

            })}
        </section>
    )

}

export default PlaceList