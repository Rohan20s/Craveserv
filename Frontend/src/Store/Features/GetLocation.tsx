// import { useEffect, useState } from 'react'
import React, { useEffect, useState } from 'react'
import { auth } from '../../Firebase';

function GetAddress(position: any) {
  const [data, setData] = useState("")
  console.log("api call")
  
  useEffect(() => {
    if (position)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ position.coords.latitude},${position.coords.longitude}&sensor=true&key=AIzaSyC7ezPkT57uAtNPo8lX6uavw8q7bX2Btf4`)
      .then(response => response.json())
      .then(data => {
        var address = data.plus_code.compound_code
        var arrayAddress= address.split(" ")
        var filterAddress= arrayAddress.slice(1,arrayAddress.length)
        console.log(filterAddress)
        setData(filterAddress.join(""))
      })
      .catch(error => console.log(error));
  }, [position])

  return { data }

}


export const useGeoLocation = () => {
  const [address, setAddress] = useState<any>(null)
  const { data } = GetAddress(address)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setAddress(position)
    }, function error(error) {
      console.log("not getting location", error)
    });
  }, [])


  console.log(auth)

  return { data };

}

export default useGeoLocation