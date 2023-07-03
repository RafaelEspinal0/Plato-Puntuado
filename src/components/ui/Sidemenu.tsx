import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import { useContext } from "react";
import { UIContext } from "@/context/ui";
import { useRouter } from "next/router";

export const Sidemenu = () => {
  const router = useRouter();
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <Drawer
      anchor="left"
      open={sideMenuOpen}
      onClose={closeSideMenu}
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 1 }}>
        <List>
          <Link display="flex" alignItems="center">
            <Box
              component="img"
              sx={{
                height: 200,
                paddingLeft: 3,
              }}
              alt=""
              src="/lighttheme.png"
            />
          </Link>
          <Divider />


              <ListItem button>
                <ListItemIcon>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"}
                  onClick={() => navigateTo("/")}
                />
              </ListItem>
  
              <Divider />

              <ListItem button >  {/*onClick={onLogout} */}
                <ListItemIcon>
                  <HttpsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} />
              </ListItem>
           
        </List>
      </Box>
    </Drawer>
  );
};
