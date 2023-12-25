import { ThemeProvider as NextThemesProvider } from "next-themes";
import PropTypes from "prop-types";

export const ThemeProvider = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node
};
