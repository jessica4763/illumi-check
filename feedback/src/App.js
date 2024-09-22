import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload'
import Settings from './components/Settings'

function App() {
  return (
    <div className="page-container">
        <div className="section section-left">
            <p className="text header-text">Phong lighting feedback</p>
            <Upload />
            <Settings />
        </div>
        <div className="section section-right">
            <p className="text header-text placeholder-text">results will be displayed here</p>
        </div>
    </div>
  )
}


export default App;
