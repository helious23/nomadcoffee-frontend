//@ts-nocheck
/* global kakao */
import { useEffect, useState } from "react";

interface IAddressProps {
  latitude: string;
  longitude: string;
}

const LatLngToAddress: React.FC<IAddressProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState();

  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6ac687f0179a12faf4ca9a48014908e4&autoload=false&libraries=services";

    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        const coord = new kakao.maps.LatLng(latitude, longitude);
        const callback = function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
          }
        };

        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    };
  }, []);

  return <div>{address}</div>;
};

export default LatLngToAddress;
