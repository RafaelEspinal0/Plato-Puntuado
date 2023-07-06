import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Input,
  InputAdornment,
  IconButton,
  ListSubheader,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useContext, useState } from "react";
import { UIContext } from "@/context/ui";
import { useRouter } from "next/router";
import { LoginOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material";

export const Sidemenu = () => {
  const router = useRouter();
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if( searchTerm.trim().length === 0 ) return;
    navigateTo(`/search/${searchTerm}`)
  }

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <Drawer
      anchor="right"
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

          <ListItem>
            <Input
                value={ searchTerm }
                onChange={ (e) => setSearchTerm(e.target.value)}
                onKeyDown={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                type='text'
                placeholder="Search ..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={ onSearchTerm }
                    >
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"}
              onClick={() => navigateTo("/")}
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
                <VpnKeyOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Sign in'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
                <LoginOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Log out'} />
          </ListItem>

          <Divider/>
          
          <ListSubheader>Admin Panel</ListSubheader>

           
        </List>
      </Box>
    </Drawer>
  );
};
