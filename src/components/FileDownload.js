import React, { useState, useEffect } from 'react'
import datasetsService from '../services/datasets'

const FileDownload = (props) => {
  const [id, setId] = useState('')
  const [datasets, setDatasets] = useState([])
  const [fileFormat, setFileFormat] = useState('')

  useEffect(() => {
    getAllDatasets()
  }, [])

  const getFile = async (event) => {
    event.preventDefault()
    try {
      //BACKUP: 'Content-Type': `text/${fileFormat}`,
      const config = {
        headers: {
          'Content-Type': `text/plain`,
          'Content-Disposition': `attachment; filename="test.${fileFormat}"`
        }
      }
      const data = await datasetsService.getOne(id)
      console.log(data)
      setId('')
    } catch (exception) {
      console.log(exception.response || exception)
    }
  }

  const getAllDatasets = async () => {
    try {
      const allDatasets = await datasetsService.getAll()
      setDatasets(allDatasets)
    } catch (exception) {
      console.log(exception.response || exception)
    }
  }

  return (
    <div>
      <form onSubmit={getFile}>
        <select
          value={fileFormat}
          onChange={(event) => setFileFormat(event.target.value)}
        >
          <option value='arff'>.arff file</option>
          <option value='csv'>.csv file</option>
          <option value='json'>.json file</option>
        </select>
        <select
          value={id}
          onChange={(event) => setId(event.target.value)}
        >
          {datasets.map(dataset =>
            <option
              value={dataset.id}
              key={dataset.id}
            >
              {dataset.name}
            </option>
          )}
        </select>
        <button type='submit'>Download</button>
      </form>
      <button onClick={getAllDatasets}>Get All</button>
    </div>
  )
}

export default FileDownload