//@ts-nocheck
/* global kakao */
import { useEffect } from "react";

interface IAddressProps {
  address: string;
  setLatLng: any;
}

const AddressToLatLng: React.FC<IAddressProps> = ({ address, setLatLng }) => {
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

        const callback = (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setLatLng({ latitude: result[0].y, longitude: result[0].x });
          }
        };
        geocoder.addressSearch(address, callback);
      });
    };
  }, [address, setLatLng]);

  return <div></div>;
};

export default AddressToLatLng;
