import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { memo } from "react";
import { SERVER_URL } from "../lib/constants";
import { useMedia } from "../lib/useMedia";

interface IStepCardItemProps {
  step: IStep;
  reverse: boolean;
}

const StepCardItem = ({ step, reverse }: IStepCardItemProps): JSX.Element => {
  const { matchesMobile } = useMedia();
  return (
    <Box sx={styles.root}>
      <Box
        sx={styles.article}
        style={{
          order: matchesMobile ? 1 : reverse ? 0 : 1,
          padding: matchesMobile ? "" : reverse ? "0 34px 0 0" : "0 0 0 34px",
        }}
      >
        {!matchesMobile && (
          <Typography sx={styles.title} variant="h6">
            {step.title}
          </Typography>
        )}
        <Typography component="pre" sx={styles.content}>
          {step.content}
        </Typography>
      </Box>
      <Box
        sx={styles.img}
        style={{ order: matchesMobile ? 0 : reverse ? 1 : 0 }}
      >
        <img src={`${SERVER_URL}/${step.image}`} alt="Статья" />
      </Box>
      {matchesMobile && (
        <Typography
          sx={{ color: "primary.main", mb: "12px" }}
          style={{ order: -1 }}
          variant="h6"
        >
          {step.title}
        </Typography>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: { xs: "", sm: "300px" },
    m: "20px 0",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
  },
  article: {
    width: { xs: "100%", sm: "45%" },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: "primary.main",
  },
  content: {
    maxHeight: "calc(100% - 28px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre-wrap",
    fontSize: "17px",
    color: "#777777",
  },
  img: {
    width: { xs: "100%", sm: "55%" },
    height: { xs: "215px", sm: "100%" },
    mb: { xs: "16px", sm: "" },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: { xs: "0px", sm: "5px" },
    },
  },
};

export default memo(StepCardItem);
