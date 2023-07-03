import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import NextLink from "next/link";
import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UIContext } from "@/context";
import { useRouter } from "next/router";

export const Navbar = () => {
  const [isBack, setIsBack] = useState(false);
  const { openSideMenu } = useContext(UIContext);
  const route = useRouter()
  

  useEffect(() => {
    const home = () => {
      if(route.asPath === '/'){
        setIsBack(false)
      }else{
        setIsBack(true)
      }
    }
    home();
  })

  const navigateTo = (url: string) => {
    route.push(url);
  };
  
  return (
    <AppBar>
      <Toolbar>
        {
          isBack ? 
          <IconButton size="large" edge="start"  onClick={() => navigateTo("/")}>
            <ArrowBackIcon />
          </IconButton>
          :
          null
          
        }
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
