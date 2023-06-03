import { useContext } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Button,
  Badge,
} from "@mui/material";
import NextLink from "next/link";
import { SearchOutlined, Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { UIContext } from "@/context";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  // const onLogout = () => {
  //   logout();
  // };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Box
              component="img"
              sx={{
                height: 130,
              }}
              alt=""
              src="/lighttheme.png"
            />
          </Link>
        </NextLink>

        <Box flex={1} />
        <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>

        <Box flex={1} />

        {/* <IconButton>
            <SearchOutlined/>
          </IconButton> */}

        <IconButton >
          <Logout />
        </IconButton>

        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
