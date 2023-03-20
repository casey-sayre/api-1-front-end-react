import React, { useState, useCallback, useEffect, Fragment } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Box, Button, Grid, List, ListItem, TextField, Typography, Paper, Stack, useTheme, makeStyles, Theme } from '@mui/material';
import { IAlbum } from './Album';
import { ClassNames } from '@emotion/react';
import { AlbumRow } from './AlbumRow';
import { AlbumHeaderRow } from './AlbumHeaderRow';

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
    <Box style={{ padding: "12px", borderRadius: "12px", backgroundColor: "lightyellow" }}>
      <Grid container sx={{ paddingBottom: "20px" }}>
        <Grid item container direction={"row"} justifyContent={"center"}>
          <Typography variant="h5" color={"primary"}>
            Album Library
          </Typography>
        </Grid>
      </Grid>
      <AlbumHeaderRow />
      {albums.map((album, index) => {
        return <AlbumRow key={index} album={album} onPriceEdit={onPriceEdit} />
      })}
    </Box>
  );
};