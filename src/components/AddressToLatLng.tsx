import { useEffect } from "react";
interface IAddressProps {
  address: string;
  setLatLng: any;
}

const AddressToLatLng: React.FC<IAddressProps> = ({ address, setLatLng }) => {
  const kakao = window.kakao;

  useEffect(() => {
    if (kakao) {
      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        const callback = (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setLatLng({ latitude: result[0].y, longitude: result[0].x });
          }
        };
        //@ts-ignore
        geocoder.addressSearch(address, callback);
      });
    }
  }, [kakao, address, setLatLng]);

  return <div></div>;
};

export default AddressToLatLng;
