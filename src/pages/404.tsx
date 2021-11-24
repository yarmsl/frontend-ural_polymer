import { Container } from "@mui/material";
import HelmetTitle from "../layouts/Helmet";
import MainLayout from "../layouts/MainLayout";

const NotFound = (): JSX.Element => {
  return (
    <MainLayout>
      <HelmetTitle title="404" />
      <Container>404</Container>
    </MainLayout>
  );
};

export default NotFound;
