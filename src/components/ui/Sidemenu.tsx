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
import { Favorite, LocalCafe, LoginOutlined, PersonAdd, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { AuthContext } from "@/context";

export const Sidemenu = () => {
  const router = useRouter();
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext)

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if( searchTerm.trim().length === 0 ) return;
    navigateTo(`/search/${searchTerm}`)
  }

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const onLogout = () => {
    logout()
  }

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

          {
            isLoggedIn && (
              <>
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
                    <Favorite />
                  </ListItemIcon>
                  <ListItemText primary={"My Favorites"}
                    onClick={() => navigateTo("/")}
                  />
                </ListItem>

                
              </>
            )
          }

          {
            isLoggedIn 
            ?(
            
              <ListItem button onClick={logout}>
                <ListItemIcon>
                    <LoginOutlined/>
                </ListItemIcon>
                <ListItemText primary={'Log out'} />
              </ListItem>
              
            )
            :
            (
              <ListItem button>
                <ListItemIcon>
                    <VpnKeyOutlined/>
                </ListItemIcon>
                <ListItemText primary={'Sign in'} 
                  onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}/>
              </ListItem>
            )
          }

          {
            user?.role === 'Admin' && (
              <>
                <Divider/>
            
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem button>
                  <ListItemIcon>
                      <LocalCafe/>
                  </ListItemIcon>
                  <ListItemText primary={'Restaurantes'} 
                    onClick={() => navigateTo("/admin/restaurants")}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                      <PersonAdd/>
                  </ListItemIcon>
                  <ListItemText primary={'Users'} 
                    onClick={() => navigateTo("/auth/login")}/>
                </ListItem>   
              </>
            )
          }
           
        </List>
      </Box>
    </Drawer>
  );
};
