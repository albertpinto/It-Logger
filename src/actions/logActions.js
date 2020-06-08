import {
  GET_LOGS,
  ADD_LOG,
  SET_LOADING,
  LOGS_ERROR,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from './types'

const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}
// Get logs Action

export const getLogs = () => async (dispatch) => {
  try {
    setLoading()
    const res = await fetch('/logs')
    const data = await res.json()
    dispatch({
      type: GET_LOGS,
      payload: data,
    })
  } catch (Err) {
    dispatch({
      type: LOGS_ERROR,
      payload: Err.response.statusText,
    })
  }
}

// Add Log Action
export const addLogs = (log) => async (dispatch) => {
  try {
    setLoading()
    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    dispatch({
      type: ADD_LOG,
      payload: data,
    })
  } catch (Err) {
    dispatch({
      type: LOGS_ERROR,
      payload: Err.response.statusText,
    })
  }
}

// Delete Log Action
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading()
    await fetch(`/logs/${id}`, {
      method: 'DELETE',
    })
    dispatch({
      type: DELETE_LOG,
      payload: id,
    })
  } catch (Err) {
    dispatch({
      type: LOGS_ERROR,
      payload: Err.response.statusText,
    })
  }
}
//Update Log on server
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading()
    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    dispatch({
      type: UPDATE_LOG,
      payload: data,
    })
  } catch (Err) {
    dispatch({
      type: LOGS_ERROR,
      payload: Err.response.statusText,
    })
  }
}

// Search Logs Action

export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading()
    const res = await fetch(`/logs?q=${text}`)
    const data = await res.json()
    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    })
  } catch (Err) {
    dispatch({
      type: LOGS_ERROR,
      payload: Err.response.statusText,
    })
  }
}

// set Current action
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  }
}

//  clearCurrent action
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  }
}
