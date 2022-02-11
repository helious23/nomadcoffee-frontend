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
    script.src = process.env.REACT_APP_KAKAO_MAP!;

    document.head.appendChild(script);

    script.onload = () => {
      //@ts-ignore
      window.kakao.maps.load(() => {
        //@ts-ignore
        const geocoder = new window.kakao.maps.services.Geocoder();
        //@ts-ignore
        const coord = new window.kakao.maps.LatLng(latitude, longitude);
        const callback = function (result: any, status: any) {
          //@ts-ignore
          if (status === window.kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
          }
        };

        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    };
  }, [latitude, longitude]);

  return <div>{address}</div>;
};

export default LatLngToAddress;
