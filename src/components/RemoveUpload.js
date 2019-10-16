import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeDataset } from '../reducers/datasetsReducer'

const ManageUploads = (props) => {
  const [id, setId] = useState('')

  const removeFile = async (event) => {
    event.preventDefault()
    try {
      props.removeDataset(id, props.user)
      setId('')
    } catch (exception) {
      console.log(exception.response)
    }
  }

  return (
    <div>
      <form onSubmit={removeFile}>
        <select
          value={id}
          onChange={(event) => setId(event.target.value)}
        >
          <option value=''>Select dataset to remove</option>
          {props.datasets.filter(
            dataset => dataset.user.username === props.user.username)
            .map(dataset => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))
          }
        </select>
        <button type='submit' disabled={id === ''}>
          Remove dataset
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    datasets: state.datasets,
    user: state.user
  }
}

export default connect(mapStateToProps, { removeDataset })(ManageUploads)