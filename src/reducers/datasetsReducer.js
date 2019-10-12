import datasetsService from '../services/datasets'

const datasetsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DATASETS':
      return action.data
    case 'REMOVE_DATASET':
      const id = action.data.id
      return state.filter(dataset => dataset.id !== id)
    case 'ADD_DATASET':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeDatasets = () => {
  return async (dispatch) => {
    const datasets = await datasetsService.getAll()
    dispatch({
      type: 'INIT_DATASETS',
      data: datasets
    })
  }
}

export const removeDataset = (id, user) => {
  return async (dispatch) => {
    try {
      await datasetsService.remove(id, user.token)
      dispatch({
        type: 'REMOVE_DATASET',
        data: { id }
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const addDataset = (dataset) => {
  return {
    type: 'ADD_DATASET',
    data: dataset
  }
}

export default datasetsReducer