import React, { Fragment } from "react";
import { Grid, Button, List } from "@material-ui/core";

import EventItem from "./EventItem";

interface AddProps {
  data: any;
  addItem: Function;
  removeItem: Function;
}

const AddPage: React.FunctionComponent<AddProps> = ({
  data,
  addItem,
  removeItem,
}) => {
  const add = (dateTime: String, type: String) => {
    addItem({ dateTime, type });
    console.log(data);
  };
  const buttonTypes = [
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
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            style={{ overflowY: "auto", height: "calc(100vh - 100px)" }}
            justify="space-around"
          >
            {buttonTypes.map((value, index) => {
              return (
                <Grid item>
                  <Button
                    variant={"contained"}
                    style={{ width: "100%" }}
                    onClick={() => {
                      let date = new Date().toLocaleString();
                      add(date, value);
                      console.log(date);
                    }}
                  >
                    {value}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <List
            style={{
              marginLeft: "5%",
              width: "95%",
              overflowY: "auto",
              maxHeight: "calc(100vh - 110px)",
            }}
          >
            {data.map((value: any, index: number) => {
              return (
                <EventItem
                  value={value}
                  index={index}
                  removeItem={removeItem}
                ></EventItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AddPage;
