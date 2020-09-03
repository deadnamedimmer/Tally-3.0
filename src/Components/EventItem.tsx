import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

interface EventItemProps {
  value: any;
  id: String;
  removeItem: Function;
}

const EventItem: React.FunctionComponent<EventItemProps> = ({
  value,
  id,
  removeItem,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={value.type}
        secondary={
          <Typography component="span" variant="body2" color="textPrimary">
            {value.dateTime}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            removeItem(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default EventItem;
