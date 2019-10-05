import React, { useState } from 'react'
import datasetsService from '../services/datasets'

const ManageUploads = (props) => {
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
        <input
          type='text'
          onChange={(event) => setId(event.target.value)}
          placeholder='Type dataset ID'
          value={id}
        />
        <button type='submit'>Remove dataset</button>
      </form>
    </div>
  )
}

export default ManageUploads