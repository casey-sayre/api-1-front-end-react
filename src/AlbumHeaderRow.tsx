import { Grid, Typography } from "@mui/material";
import React from "react";
import { IAlbum } from "./Album";


export const AlbumHeaderRow = () => {
  return  <Grid container>
    <Grid item container direction={"row"} justifyContent={"center"} xs={4}>
      <Typography variant="h6" color="primary">
        Artist
      </Typography>
    </Grid>
    <Grid item container direction={"row"} justifyContent={"center"} xs={5}>
      <Typography variant="h6" color="primary">
        Title
      </Typography>
    </Grid>
    <Grid item container direction={"row"} justifyContent={"center"} xs={3}>
      <Typography variant="h6" color="primary">
        Price
      </Typography>
    </Grid>
  </Grid>;

};
