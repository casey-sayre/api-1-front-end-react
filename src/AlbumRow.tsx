import { Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { IAlbum } from "./Album";

type Props = {
  album: IAlbum,
  onPriceEdit: (a: IAlbum) => void
}

export const AlbumRow = ({ album, onPriceEdit }: Props) => {

  return <Grid container>
    <Grid item xs={4}>
      <Paper component={Stack} direction="column" justifyContent="center" height={"100%"} elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="body1" color="primary">
          {album.artist}
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={5}>
      <Paper component={Stack} direction="column" justifyContent="center" height={"100%"} elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="body1" color="primary">
          {album.title}
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper component={Stack} direction="column" justifyContent="right" height={"100%"} elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Typography variant="body1" color="primary">
          {album.price}
        </Typography>
      </Paper>
    </Grid>
  </Grid>

};