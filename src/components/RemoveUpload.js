import React, { useState } from 'react'
import datasetsService from '../services/datasets'
import { connect } from 'react-redux'

const ManageUploads = ({ datasets }) => {
  const [id, setId] = useState('')

  const removeFile = async (event) => {
    event.preventDefault()
    try {
      await datasetsService.remove(id)

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
          {datasets.map(dataset => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.name}
            </option>
          ))}
        </select>
        <button type='submit'>Remove dataset</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    datasets: state.datasets
  }
}

export default connect(mapStateToProps)(ManageUploads)