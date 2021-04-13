import React from "react";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, TextField } from "@material-ui/core";

function Form() {
  const theme = createMuiTheme({
    direction: "rtl",
  });

  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <TextField placeholder="Name" />
        {/* <input type="text" placeholder="Name" /> */}
      </div>
    </ThemeProvider>
  );
}

export default Form;
