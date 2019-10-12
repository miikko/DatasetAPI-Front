import datasetsService from '../services/datasets'

const datasetsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DATASETS':
      return action.data
    case 'REMOVE':
      break
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

export default datasetsReducer