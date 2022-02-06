import { Helmet } from "react-helmet-async";

interface IPageTitleProps {
  title: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} · 노마드커피 </title>
    </Helmet>
  );
};

export default PageTitle;
