import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'

export default function Covid() {
  const [covidData, setCovidData] = useState([])
  useEffect(() => {
    axios
      .get('https://api.covid19api.com/summary')
      .then((response) => {
        console.log(response.data)
        setCovidData(response.data.Countries)
      })
      .catch((error) => {
        console.log(error)
      })
    $(document).ready(() => {
      $('#mytable').DataTable()
    })
  }, [covidData])
  const tableData = covidData.map((obj) => {
    return (
      <tr>
        <td>{obj.Country}</td>
        <td>{obj.TotalConfirmed}</td>
        <td>{obj.TotalConfirmed - obj.TotalRecovered}</td>
        <td>{obj.TotalRecovered}</td>
        <td>{obj.TotalDeaths}</td>
      </tr>
    )
  })
  return (
    <div>
      <h1 style={{ backgroundColor: 'black', color: 'white' }} className='m-5'>
        Covid Stats
      </h1>
      <div className='row' style={{ justifyContent: 'center' }}>
        <div className='col-md-8'>
          <table id='mytable' className='table table-bordered'>
            <thead>
              <tr>
                <th>Country</th>
                <th>Confirm</th>
                <th>Active</th>
                <th>Recover</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
