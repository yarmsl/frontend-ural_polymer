import { ReactElement, useMemo, useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useHistory, useRouteMatch } from "react-router";
import { useAppSelector } from "../store";

const pages = [
  {
    title: "Панель Управления",
    path: "/control_panel",
    icon: <AdminPanelSettingsRoundedIcon />,
    access: "user",
  },
  {
    title: "Управление Пользователями",
    path: "/user_managment",
    icon: <GroupRoundedIcon />,
    access: "admin",
  },
];

const ControlPanelLayout = ({ children }: Child): ReactElement => {
  const { role } = useAppSelector((st) => st.auth);
  const [burger, setBurger] = useState(false);
  const router = useHistory();
  const match = useRouteMatch();
  const title = useMemo(
    () =>
      pages?.find((page) => page.path === match.path)?.title ||
      "Панель Управления",
    [match]
  );

  return (
    <Container disableGutters sx={styles.root} maxWidth={false}>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => setBurger((p) => !p)}
            color="inherit"
            size="large"
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography sx={{ ml: "32px" }} variant="h5">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={burger}
        onOpen={() => setBurger((p) => !p)}
        onClose={() => setBurger((p) => !p)}
      >
        <List>
          <ListItem sx={styles.back}>
            <IconButton onClick={() => setBurger((p) => !p)} size="large">
              <ArrowBackRoundedIcon />
            </IconButton>
          </ListItem>
          {pages?.map((page, i) => {
            return (
              <ListItemButton
                key={`page-${i}`}
                onClick={() => router.push(page.path)}
                selected={match.path === page.path}
                disabled={page.access === "admin" && role === "user"}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText>{page.title}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </SwipeableDrawer>
      <>{children}</>
    </Container>
  );
};

const styles = {
  root: {
    width: "100%",
    height: "auto",
    pt: "64px",
  } as const,
  back: {
    height: "56px",
    display: "flex",
    justifyContent: "flex-end",
  } as const,
};

export default ControlPanelLayout;
