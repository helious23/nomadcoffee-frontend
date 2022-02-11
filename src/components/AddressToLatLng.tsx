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
    script.src = process.env.REACT_APP_KAKAO_MAP;

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
