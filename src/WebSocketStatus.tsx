import { Grid, Typography } from "@mui/material";
import React from "react";
import { ReadyState } from "react-use-websocket";

type Props = {
  readyState: ReadyState,
}

export const WebSocketStatus = ({readyState}: Props) => {
  
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  
  return       <Grid container>
  <Grid item flex={1} />
  <Grid item>
    <Typography variant="body1" color="primary">
      Websocket is&nbsp;
    </Typography>
  </Grid>
  <Grid item>
    <Typography color={readyState === ReadyState.OPEN ? "secondary" : "error"}>
      {connectionStatus}
    </Typography>
  </Grid>
</Grid>

}