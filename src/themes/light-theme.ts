import { createTheme } from '@mui/material/styles';



export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '##1E1E1E'
        },
        secondary: {
            main: '#F97F29'
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
        },
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                position: 'fixed',
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    height: 60
                },
            }
        },

        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: 30,
                    fontWeight: 600
                },
                h2: {
                    fontSize: 20,
                    fontWeight: 400
                },
                body2:{
                    color:'black',
                    
                },
                subtitle1: {
                    fontSize: 18,
                    fontWeight: 600
                }
            }
        },

        MuiFormControl:{
            styleOverrides:{
                root:{
                    ":root":{
                        color: "#F97F29"
                    }
                }
            }
        },


        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'small',
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: 10,
                    ":hover": {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease-in-out',
                        color: '#F97F29',
                    }
                }
            }
        },

        MuiIconButton:{
            styleOverrides:{
                root:{
                    boxShadow:'none',
                    ":hover":{
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease-in-out',
                        color: '#F97F29',
                    }
                }
            }
        },

        MuiCard: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
                    borderRadius: '10px',
                }
            }
        }

    }
});