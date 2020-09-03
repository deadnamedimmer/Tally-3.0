import React, { Fragment } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import api from "../api/index";
import moment from "moment";

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
  const [results, setResults] = React.useState([]);
  const [table, setTable] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [total, setTotal] = React.useState(0);

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

  const getDate = (date: Date) => {
    let dd1 = String(date.getDate()).padStart(2, "0");
    let mm1 = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy1 = date.getFullYear();

    let newDate = yyyy1 + "/" + mm1 + "/" + dd1;
    return newDate;
  };

  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY/MM/DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }

  const submitQuery = () => {
    let date1 = getDate(fromDate);
    let date2 = getDate(toDate);

    let searchTerms = { date1, date2, type };

    api.search(searchTerms).then((response) => {
      setResults(response.data.body);
      let dates = getDates(date1, date2);
      let numbers = dates.map((value: String, index: number) => {
        return 0;
      });
      for (let i = 0; i < response.data.body.length; i++) {
        numbers[dates.indexOf(response.data.body[i].date)]++;
      }
      let newTable = dates.map((value: String, index: number) => {
        return { date: value, number: numbers[index] };
      });
      setTable(newTable);
      getTotal(newTable);
      setDisplay(true);
      // if (response.data.body.length === 0) {
      //   setDisplay(false);
      // } else {
      //   let currentDate;
      //   let number;
      //   let newTable = [];
      //   for (let i = 0; i < response.data.body.length; i++) {
      //     console.log(response.data.body[i].date);
      //     if (i === 0) {
      //       currentDate = response.data.body[i].date;
      //       number = 1;
      //     } else if (response.data.body[i].date === currentDate) {
      //       number++;
      //     } else if (response.data.body[i].date !== currentDate) {
      //       currentDate = response.data.body[i].date;
      //       number = 1;
      //       newTable.push({ currentDate, number });
      //     } else if (i === response.data.body.length - 1) {
      //       newTable.push({ currentDate, number });
      //     }
      //     newTable.push({ currentDate, number });
      //   }
      //   console.log(newTable);
      //   setTable(newTable);
      //   setDisplay(true);
      // }
    });
  };

  let getTotal = (table) => {
    let tempTotal = 0;
    for (let i = 0; i < table.length; i++) {
      tempTotal += table[i].number;
    }
    setTotal(tempTotal);
  };

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
              <DatePicker
                value={fromDate}
                onChange={handleFromDateChange}
                style={pickerStyle}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Typography variant="h6">To:</Typography>
          <Box style={formStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
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
          <Button
            variant="contained"
            onClick={() => {
              submitQuery();
            }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={9}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "80%",
              marginLeft: "10%",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }} colSpan={2}>
                  {type}
                </th>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Date</th>
                <th style={{ border: "1px solid black" }}>Number</th>
              </tr>
            </thead>
            <tbody>
              {display &&
                table.map((value: any, index: number) => {
                  return (
                    <tr style={{ border: "1px solid black" }}>
                      <td style={{ border: "1px solid black" }}>
                        {value.date}
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        {value.number}
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td style={{ border: "1px solid black" }}>Total: </td>
                <td style={{ border: "1px solid black" }} onLoad={getTotal}>
                  {total}
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default StatsPage;
