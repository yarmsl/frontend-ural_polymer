import { Box, Skeleton } from "@mui/material";
import { SxProps } from "@mui/system";
import FeedBackDownload from "./FeedBackDownload";
import { useRouteMatch } from "react-router";
import FadeCarousel from "../UI/FadeCarousel/FadeCarousel";
import { useGetProjectsDataQuery } from "../store/Data";
import { useGetBottomBannerQuery } from "../store/Banner";
import { useMemo } from "react";
import ProjectSlide from "./ProjectSlide";
import FeedbackForm from "./FeedbackForm";

const FooterCarousel = (): JSX.Element => {
  const match = useRouteMatch();
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsDataQuery("");
  const { data: bottomBanner, isLoading: isBottomBannerLoading } =
    useGetBottomBannerQuery("");

  const filteredProjects = useMemo(
    () =>
      projects?.filter((proj) => bottomBanner?.projects?.includes(proj._id)) ||
      [],
    [bottomBanner, projects]
  );

  const slides = useMemo(
    () =>
      filteredProjects?.map((project, i) => (
        <ProjectSlide
          key={`proj-${i}`}
          project={project}
          showDescription={match.path !== "/contacts"}
        />
      )) || [],
    [filteredProjects, match.path]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.feedback}>
        {match.path !== "/contacts" ? <FeedBackDownload /> : <FeedbackForm />}
      </Box>
      {isProjectsLoading &&
        isBottomBannerLoading &&
        filteredProjects.length === 0 && (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        )}
      <FadeCarousel slides={slides} delay={15000} />
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
  feedback: {
    position: "absolute",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default FooterCarousel;
