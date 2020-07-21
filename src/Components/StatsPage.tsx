import React, { Fragment } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  List,
} from "@material-ui/core";
import EventItem from "./EventItem";

interface StatsProps {
  data: any;
  removeItem: Function;
}

const StatsPage: React.FunctionComponent<StatsProps> = ({
  data,
  removeItem,
}) => {
  const [fromDate, handleFromDateChange] = React.useState(new Date());
  const [toDate, handleToDateChange] = React.useState(new Date());
  const [type, setType] = React.useState("Select All");

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const formStyle = { marginBottom: "10px" };

  const pickerStyle = { width: "100%" };

  const buttonTypes = [
    "Select All",
    "Reference Question",
    "Guest Pass",
    "Technology Question",
    "Reader's Advisory",
    "Directional Question",
    "Interloan",
    "Referral",
    "Game Computer",
    "Other",
  ];

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        style={{ width: "90%", marginLeft: "5%" }}
      >
        <Grid item xs={3}>
          <Typography variant="h6">From:</Typography>
          <Box style={formStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                value={fromDate}
                onChange={handleFromDateChange}
                style={pickerStyle}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Typography variant="h6">To:</Typography>
          <Box style={formStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                value={toDate}
                onChange={handleToDateChange}
                style={pickerStyle}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Typography variant="h6">Type:</Typography>
          <Box style={formStyle}>
            <FormControl style={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleTypeChange}
                fullWidth
              >
                {buttonTypes.map((value, index) => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <List
            style={{
              marginLeft: "5%",
              width: "95%",
              overflowY: "auto",
              maxHeight: "calc(100vh - 110px)",
            }}
          >
            {data.map((value: any, index: number) => {
              if (type === value.type || type === "Select All") {
                return (
                  <EventItem
                    value={value}
                    index={index}
                    removeItem={removeItem}
                  ></EventItem>
                );
              } else {
                return <Fragment></Fragment>;
              }
            })}
          </List>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default StatsPage;
