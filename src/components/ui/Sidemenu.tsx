import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Link,
} from "@mui/material";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
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
              src="lighttheme.png"
            />
          </Link>
          <Divider />

          {/* Cualquiera */}
          {/* {(user?.id_rol === "4" ||
            user?.id_rol === "3" ||
            user?.id_rol === "1") && (
            <> */}
              <ListItem button>
                <ListItemIcon>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            {/* </>
          )} */}
          {/* Cualquiera */}

          {/* Estudiantes */}
          {/* {user?.id_rol === "4" && (
            <> */}
              <ListItem button>
                <ListItemIcon>
                  <LibraryBooksRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Historial academico"} />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <StickyNote2RoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Retiros"} />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <ChecklistRoundedIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={"Selección"} 
                  onClick={() => navigateTo("/seleccion")}
                />
              </ListItem>
            {/* </>
          )} */}
          {/* Estudiantes */}

          {/* Admin */}
          {/* {user?.id_rol === "1" && (
            <> */}
              <ListItem button>
                <ListItemIcon>
                  <SignalCellularAltRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Carreras"}
                  onClick={() => navigateTo("/carreras")}
                />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <LibraryBooksRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Asignaturas"}
                  onClick={() => navigateTo("/asignaturas")}
                />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <PersonRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Roles"}
                  onClick={() => navigateTo("/role")}
                />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={"Trimestres"}
                  onClick={() => navigateTo("/trimestres")}
                />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <PersonOutlineRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Usuarios"}
                  onClick={() => navigateTo("/usuarios")}
                />
              </ListItem>
            {/* </>
          )} */}
          {/* Admin */}

          {/* Profesor */}
          {/* {user?.id_rol === "3" && (
            <> */}
              <ListItem button onClick={() => navigateTo("/asignaturas")}>
                <ListItemIcon>
                  <LibraryBooksRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Asignaturas"} />
              </ListItem>
            {/* </>
          )} */}
          {/* Profesor */}

          {/* Cualquiera */}
          {/* {(user?.id_rol === "4" ||
            user?.id_rol === "3" ||
            user?.id_rol === "1") && (
            <> */}
              <Divider />

              <ListItem button >  {/*onClick={onLogout} */}
                <ListItemIcon>
                  <HttpsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} />
              </ListItem>
            {/* </>
          )} */}
          {/* Cualquiera */}
        </List>
      </Box>
    </Drawer>
  );
};
