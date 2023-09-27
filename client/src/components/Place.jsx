import React from 'react'
import placeData from '../utils/placeData';


function Place() {

    return (
        <section className="placeContainer">
            {<>

                <p id='placeTitle'>{placeData.name}</p>
                <img id='previewImg' src={placeData.preview.source} />
                <p id='placeDescription'>{placeData.wikipedia_extracts.text}</p>

                <button key={placeData.xid} >SAVE / Login in</button>


            </>
            }
        </section>
    )

}

export default Place