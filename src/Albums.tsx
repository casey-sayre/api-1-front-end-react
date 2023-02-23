import React, { useState, useCallback, useEffect, Fragment } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Box, Button, Grid, List, ListItem, TextField, Typography } from '@mui/material';
import { IAlbum } from './App';

const defaultAlbum: IAlbum = {
  id: 0,
  title: "",
  artist: "",
  price: 0,
}
type Props = {
  albums: Array<IAlbum>,
  updateHandler: (a: IAlbum) => void,
}
export const Albums = ({ albums, updateHandler }: Props) => {

  const [editedAlbum, setEditedAlbum] = useState<IAlbum>(defaultAlbum)

  const onPriceEdit = (a: IAlbum) => {
    setEditedAlbum(a);
    updateHandler(a);
  }

  return (
    <Box style={{ backgroundColor: 'wheat', padding: "12px", borderRadius: "12px" }}>
      <Grid container sx={{ paddingBottom: "20px" }}>
        <Grid item container direction={"row"} justifyContent={"center"}>
          <Typography variant="h5">
            Album Library
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item container direction={"row"} justifyContent={"center"} xs={4}>
          <Typography variant="h6">
            Artist
          </Typography>
        </Grid>
        <Grid item container direction={"row"} justifyContent={"center"} xs={5}>
          <Typography variant="h6">
            Title
          </Typography>
        </Grid>
        <Grid item container direction={"row"} justifyContent={"center"} xs={3}>
          <Typography variant="h6">
            Price
          </Typography>
        </Grid>
      </Grid>
      {albums.map((album, index) => {
        return <Grid container key={index}>
          <Grid item xs={4}>
            <Typography variant="body1">
              {album.artist}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1">
              {album.title}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField margin="none" variant="outlined"
              value={editedAlbum.id === album.id ? editedAlbum.price : album.price}
              onChange={e => {
                onPriceEdit({
                  ...album,
                  price: Number(e.target.value)
                })
              }} />
          </Grid>
        </Grid>
      })}
    </Box>
  );
};