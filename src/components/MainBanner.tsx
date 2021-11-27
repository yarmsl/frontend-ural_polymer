import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useRouteMatch } from "react-router";
import MainSlider from "./MainSlider";

const bannerPaths = [
  "/indastrial_design_and_engineering",
  "/production",
  "/projects",
  "/about",
];

const banner = {
  "/indastrial_design_and_engineering": {
    title: "Промышленный дизайн и инжиниринг",
    text: "Процесс создания проекта от эскиза до серийного производства - важная часть развития не только одного конкретного продукта, но и научно-технической сферы. Мы работаем с продуктом от начала и до ввода в эксплуатацию: наша команда оперативно реагирует на запросы современной индустрии, глубоко погружается в процесс создания продукта.",
    image: "/promdis.webp",
  },
  "/production": {
    title: "Производство",
    text: "УРАЛ-ПОЛИМЕР включает в себя четыре промышленных предприятия, расположенных на отдельных, независимых производственных площадях. Общая площадь производственных помещений составляет 11000 кв. м. Общая численность персонала – более 250 человек.",
    image: "/production.webp",
  },
  "/projects": {
    title: "Проекты",
    text: "Дизайн и стилевые решения, разработка технологической, опытной и серийной подготовки, комплектация серийными деталями интерьера и экстерьера",
    image: "/projects.webp",
  },
  "/about": {
    title: "",
    text: "",
    image: "https://picsum.photos/id/76/1920/1080",
  },
};

const MainBanner = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Box sx={styles.root}>
      {match.path === "/" ? (
        <MainSlider />
      ) : bannerPaths.includes(match.path) ? (
        <Box sx={styles.banner}>
          <Box sx={styles.article}>
            <Typography variant="h3" color="white">
              {banner[match.path].title}
            </Typography>
            <Typography variant="h6" color="white">
              {banner[match.path].text}
            </Typography>
          </Box>
          <Box sx={styles.blackout}></Box>
          <img src={banner[match.path].image} alt={banner[match.path].title} />
        </Box>
      ) : null}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "525px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  banner: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  blackout: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    zIndex: 2,
  },
  article: {
    width: "100%",
    maxWidth: "872px",
    minWidth: "300px",
    position: "absolute",
    p: '0 10px',
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default MainBanner;
