import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "@/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { UIProvider } from "@/context/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </>
  );
}
