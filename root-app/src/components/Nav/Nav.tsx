import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { styles } from "./Nav.styles";
import { newPages } from "../../shared/constants/Pages";

const Nav = () => {
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AccountBalanceIcon sx={styles.icon} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={styles.title}
            >
              Banco Pichincha
            </Typography>
            <Box sx={styles.optionsContainer}>
              {newPages.map((page, index) => (
                <Button
                  onClick={() => {
                    window.location.href = page.appRoute;
                  }}
                  key={index}
                  sx={styles.option}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Toolbar />
        {newPages.map((page, index) => (
          <div key={index} id={`${page.htmlImport}:${page.name}`}></div>
        ))}
      </main>
    </div>
  );
};

export default Nav;
