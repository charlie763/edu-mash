import * as Cookies from "js-cookie"
const BASE_URL = 'http://localhost:3000/playlists'

const token = Cookies.get("eduResourceSession");

function fetchPlaylists(){
  const configObj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token
    }
  }
  return dispatch => {
    dispatch({type: 'LOAD_PLAYLISTS'})
    fetch(BASE_URL + `/?token=${token}`, configObj)
      .then(resp => resp.json())
      .then(playlists => dispatch({
        type: "ADD_PLAYLISTS",
        playlists
      }))
  }
}

function addResourceToPlaylist(resourceID, playlistId){
  const configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token
    },
    body: {
      action: "add",
      resource_id: resourceID,
      id: playlistId
    }
  }
  return dispatch => {
    fetch(BASE_URL + `/${playlistId}`, configObj)
      .then(resp => resp.json())
      .then(updatedPlaylist => dispatch({
        type: "ADD_RESOURCE_TO_PLAYLIST",
        updatedPlaylist
      }))
  }
}

export { fetchPlaylists, addResourceToPlaylist }