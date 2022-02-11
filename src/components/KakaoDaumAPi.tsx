import { Helmet } from "react-helmet-async";

const KakaoDaumAPi = () => {
  return (
    <Helmet>
      <script
        type="text/javascript"
        async
        src={process.env.REACT_APP_KAKAO_MAP}
      ></script>
      <script
        type="text/javascript"
        async
        src={process.env.REACT_APP_DAUM_POSTCODE}
      ></script>
    </Helmet>
  );
};

export default KakaoDaumAPi;
