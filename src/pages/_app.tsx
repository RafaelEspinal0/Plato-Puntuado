import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "@/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { UIProvider } from "@/context/ui";
import { SWRConfig } from "swr";
import { AuthProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}
