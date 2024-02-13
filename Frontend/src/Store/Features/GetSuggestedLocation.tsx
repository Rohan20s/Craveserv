import React from 'react'

const useSuggestedLocation =  (text:string) => {

    var [places,setPlaces]=React.useState({})

    const displaySuggestions = (predictions:any) => {
        places=predictions
        setPlaces(predictions)
    };

    React.useEffect(()=>{
        const service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({
            input: "raipur"
        }, displaySuggestions);
    },[]) 


    return {places}
  
}

export default useSuggestedLocation