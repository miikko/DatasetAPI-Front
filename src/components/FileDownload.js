import React, { useState } from 'react'
import { connect } from 'react-redux'
import datasetsService from '../services/datasets'
import fileDownload from 'js-file-download'

const FileDownload = ({ datasets }) => {
  const [id, setId] = useState('')
  const [fileFormat, setFileFormat] = useState('')

  const getFile = async (event) => {
    event.preventDefault()
    if (id && fileFormat) {
      try {
        const res = await datasetsService.getOne(id, fileFormat)
        const name = datasets.find(dataset => dataset.id === id).name
        fileDownload(fileFormat === 'json' ? JSON.stringify(res.data) : res.data, `${name}.${fileFormat}`)
        setId('')
      } catch (exception) {
        console.log(exception.response || exception)
      }
    }
  }

  return (
    <div>
      <form onSubmit={getFile}>
        <select
          value={id}
          onChange={(event) => setId(event.target.value)}
        >
          <option value=''>Select dataset</option>
          {datasets.map(dataset =>
            <option
              value={dataset.id}
              key={dataset.id}
            >
              {dataset.name}
            </option>
          )}
        </select>
        <select
          value={fileFormat}
          onChange={(event) => setFileFormat(event.target.value)}
        >
          <option value=''>Select file-extension</option>
          <option value='arff'>.arff file</option>
          <option value='csv'>.csv file</option>
          <option value='json'>.json file</option>
        </select>
        <button type='submit'>Download</button>
      </form>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    datasets: state.datasets
  }
}

export default connect(mapStateToProps)(FileDownload)