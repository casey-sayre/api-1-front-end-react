import { Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IAlbum } from "./Album";

type Props = {
  album: IAlbum,
  onPriceEdit: (a: IAlbum) => void
}

export const AlbumRow = ({ album, onPriceEdit }: Props) => {

  const priceRef = useRef("");

  useEffect(() => {
   priceRef.current = album.price.toString()
  }, []);

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
      <TextField margin="none" variant="outlined" color="primary"
        value={priceRef.current}
        onChange={e => {
          priceRef.current = e.target.value;
          onPriceEdit({
            ...album,
            price: Number(e.target.value)
          })
        }}
      />
    </Grid>
  </Grid>

};