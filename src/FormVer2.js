import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
// import { createMuiTheme } from "@material-ui/core";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
// Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const theme = createMuiTheme({
  direction: "rtl",
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === "" ? null : value}
    />
  );
}

function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === "" ? null : value}
    />
  );
}

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};
let a = "temp";
function FormVer2() {
  const theme = createMuiTheme({
    direction: "rtl",
  });

  // var encoding = require("encoding");
  // const fs = require("fs");
  // const yooo = async () => {
  //   const response = await fetch("cities.csv");
  //   const data = await response.text();
  //   // let csvString = encoding.convert(data, "UTF8", "CP1255").toString();
  //   console.log(data);
  //   var resultBuffer = encoding.convert(data, "utf8", "windows1252");
  //   let frenchWords = resultBuffer.toString().split("\r\n");
  //   // console.log(frenchWords);
  //   setstate("end");
  //   // setstate(csvString);
  // };
  // yooo();
  const [data, setdata] = useState("start");
  const [cities_arr, setcities_arr] = useState([]);
  const GetData = async () => {
    const response = await fetch("cities_utf.csv");
    const data = await response.text();
    setdata(data);
    let cities_set = new Set();
    const rows = data.split("\n").slice(1);
    rows.forEach((elt) => {
      const row = elt.split(",");
      const city = row[1];
      cities_set.add(city);
    });
    // console.log(cities_arr);
    let cities_new = Array.from(cities_set);
    cities_new = cities_new.map((ele) => {
      // console.log(ele);
      return (
        <MenuItem key={ele} value={ele}>
          {ele}
        </MenuItem>
      );
    });
    console.log("1");

    // console.log(cities_arr);
    // console.log("wow");
    let new_one = cities_new.slice();
    setcities_arr(new_one);
    // console.log(new_one);
  };
  useEffect(() => GetData(), []);
  // console.log("1");

  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <div dir="rtl" style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
          <CssBaseline />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            רוניברסל - בדיקת מיגון
          </Typography>

          <Typography paragraph>
            <Link href="https://roniversal.co.il/">
              ניתן לצפות בעוד שירותים ומוצרים באתר
            </Link>
          </Typography>
          <Form
            onSubmit={onSubmit}
            initialValues={{ employed: true, stooge: "larry" }}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="firstName"
                        component={TextField}
                        type="text"
                        label="שם פרטי"
                        // style={{ align: "right" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="lastName"
                        component={TextField}
                        type="text"
                        label="שם משפחה"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        fullWidth
                        required
                        component={TextField}
                        type="email"
                        label="אימייל"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label="נא לסמן אם קיים איתוראן ברכב"
                        control={
                          <Field
                            name="employed"
                            component={Checkbox}
                            type="checkbox"
                          />
                        }
                      />
                    </Grid>
                    <Grid item>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Best Stooge</FormLabel>
                        <RadioGroup row>
                          <FormControlLabel
                            label="Larry"
                            control={
                              <Field
                                name="stooge"
                                component={Radio}
                                type="radio"
                                value="larry"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Moe"
                            control={
                              <Field
                                name="stooge"
                                component={Radio}
                                type="radio"
                                value="moe"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Curly"
                            control={
                              <Field
                                name="stooge"
                                component={Radio}
                                type="radio"
                                value="curly"
                              />
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Sauces</FormLabel>
                        <FormGroup row>
                          <FormControlLabel
                            label="Ketchup"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="ketchup"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Mustard"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="mustard"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Salsa"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="salsa"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Guacamole 🥑"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="guacamole"
                              />
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="notes"
                        component={TextField}
                        multiline
                        label="מספר רכב"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="טלפון"
                        component={TextField}
                        multiline
                        label="טלפון"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="city"
                        component={Select}
                        label="Select a City"
                        formControlProps={{ fullWidth: true }}
                      >
                        <MenuItem value="London">London</MenuItem>
                        <MenuItem value="Paris">Paris</MenuItem>
                        <MenuItem value="Budapest">
                          A city with a very long Name
                        </MenuItem>
                        {cities_arr}
                      </Field>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6}>
                        <Field
                          name="rendez-vous"
                          component={DatePickerWrapper}
                          fullWidth
                          margin="normal"
                          label="Rendez-vous"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="alarm"
                          component={TimePickerWrapper}
                          fullWidth
                          margin="normal"
                          label="Alarm"
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={reset}
                        disabled={submitting || pristine}
                      >
                        איפוס
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                      >
                        שליחה
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                {/* <pre>{cities_arr}</pre> */}
                {/* {console.log(cities_arr)} */}
              </form>
            )}
          />
        </div>
      </RTL>
    </ThemeProvider>
  );
}

// ReactDOM.render(<App />, document.querySelector("#root"));
export default FormVer2;
