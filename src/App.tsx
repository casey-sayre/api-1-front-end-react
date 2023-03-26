import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Albums } from './Albums';
import { IAlbum } from './Album';
import { useDebounce } from './useDebounce';
import { WebSocketStatus } from './WebSocketStatus';
import useWebSocket from 'react-use-websocket';

const defaultAlbums = new Array<IAlbum>()

export default function App() {

  const [albums, setAlbums]: [IAlbum[], (albums: IAlbum[]) => void] = useState(defaultAlbums)

  // websocket setup to receive updated albums
  const socketUrl = 'ws://localhost:8081/album-updates';

  const { readyState } = useWebSocket(socketUrl, {
    onMessage: (event: WebSocketEventMap["message"]) => {
      console.log("socket", event.data)
      let editedAlbum: IAlbum = JSON.parse(event.data)
      setAlbums(albums.map(album => {
        return editedAlbum.id === album.id ? editedAlbum : album;
      }))
    },
    onError: (event: Event) => {
      console.log(event);
    },
    onClose: (event: Event) => {
      console.log(event);
    },
  });

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

  const updateAlbum = useDebounce((album: IAlbum) => {
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
  }, 500);

  return (
    <Container maxWidth="md">
      <WebSocketStatus readyState={readyState} />
      <Albums albums={albums} updateHandler={updateAlbum} />
    </Container>
  );
}
