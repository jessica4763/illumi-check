import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Results from './components/Results'
import Settings from './components/Settings'
import Upload from './components/Upload'

function App() {
  const [results, setResults] = useState(false)

  return (
    <div className="page-container">
        <div className="section">
            <p className="text header-text">Phong lighting feedback</p>
            <Upload setResults={setResults}/>
            <Settings />
            
        </div>
        <div className="section">
            <Results results={results} />
        </div>
    </div>
  )
}


export default App;
