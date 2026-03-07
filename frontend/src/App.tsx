import { useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [warning, setWarning] = useState('')

  const fetchData = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setWarning('Please input a title to start searching')
      return
    }
    setWarning('')
    fetch(`http://localhost:3000/api-data?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.error('Error fetching from backend:', err)
      })
  }


  return (
    <>
      <h1>Data from API</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
        <button onClick={() => fetchData(search)}>Search</button>
      </div>
      {warning && <p className="warning-text">{warning}</p>}
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="th-title">Title</th>
              <th className="th-body">Body</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td className="td-title">{item.title}</td>
                <td className="td-body">{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
