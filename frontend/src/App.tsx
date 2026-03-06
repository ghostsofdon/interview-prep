import { useState } from 'react'
import './App.css'

function App() {
  //TODO:
  //Fetch data from backend
  //Implement search by title
  //Render table with title and body
  //Add warning if search is empty
  //Add loading state
  //Add error state  
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
      <input type="text" placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => fetchData(search)}>Search</button>
      {warning && <p style={{ color: 'red' }}>{warning}</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td> {item.title}</td>
              <td> {item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
