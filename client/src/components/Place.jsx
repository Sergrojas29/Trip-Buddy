import React from 'react'
import placeData from '../utils/placeData';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Button } from '@mui/material';

function Place() {


    function addedtouser(){
        console.log('added')
    }

    return (
        <section className="placeContainer">
            {<>

                <p id='placeTitle'>{placeData.name}</p>
                <img id='previewImg' src={placeData.preview.source} />
                <p id='placeDescription'>{placeData.wikipedia_extracts.text}</p>
            </>
            }

            {Auth.loggedIn() ? (
                <>
                        <Button key={Auth.getProfile().data._id} id='savebtn' onClick={addedtouser}>SAVE</Button>

                </>
            ) : (
                <Link to='/login'>
                    <button id='savebtn' >LOGIN</button>

                </Link>
            )}



        </section>
    )

}

export default Place