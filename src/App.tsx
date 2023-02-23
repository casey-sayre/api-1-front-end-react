import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { Albums } from './Albums';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export interface IAlbum {
  id: number,
  title: string,
  artist: string,
  price: number,
}

const defaultAlbums = new Array<IAlbum>()


export default function App() {

  const [albums, setAlbums]: [IAlbum[], (albums: IAlbum[]) => void] = useState(defaultAlbums)

  // websocket setup to receive updated albums
  const socketUrl = 'ws://localhost:8081/album-updates';

  const { readyState } = useWebSocket(socketUrl, {
    onMessage: (event: WebSocketEventMap["message"]) => {
      console.log("socket", event.data)
      let editedAlbum = JSON.parse(event.data)
      setAlbums(albums.map(album => {
        return editedAlbum.id === album.id ? editedAlbum : album;
      }))
    }
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // album data
  useEffect(() => {
    axios.get<IAlbum[]>("http://localhost:8080/albums", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setAlbums(response.data)
      })
      .catch((ex) => {
        console.log(ex.toString())
      })
  }, [])

  const updateAlbum = (album: IAlbum) => {
    axios.patch<IAlbum>(`http://localhost:8080/albums/${album.id}`, album, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        setAlbums(albums.map(album => {
          return response.data.id === album.id ? response.data : album;
        }))
      })
      .catch((ex) => {
        console.log(ex.toString())
      })
  }

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item flex={1} />
        <Grid item>
          <Typography variant="body1">
            Websocket is <span style={{color: readyState == ReadyState.OPEN ? "green" : "red"}}>{connectionStatus}</span>
          </Typography>
        </Grid>
      </Grid>
      <Albums albums={albums} updateHandler={updateAlbum} />
    </Container>
  );
}
