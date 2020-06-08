import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  GET_LOGS,
  SET_LOADING,
} from '../actions/types'

const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

export const getTechs = () => async (dispatch) => {
  try {
    setLoading()
    const res = await fetch('/techs')
    const data = await res.json()
    dispatch({
      type: GET_TECHS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    })
  }
}

export const addTechs = (tech) => async (dispatch) => {
  try {
    setLoading()
    const res = await fetch('/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    dispatch({
      type: ADD_TECH,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    })
  }
}

export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading()
    console.log('Delete Tech id', id)
    await fetch(`/techs/${id}`, {
      method: 'DELETE',
    })
    //const data = await res.json()
    dispatch({
      type: DELETE_TECH,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    })
  }
}
