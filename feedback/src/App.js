import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload'


function App() {
  return (
    <div class="container">
        <div class="section left">
            <Upload/>
            <div class="settings">
            </div>
        </div>
        <div class="section right">
            <p class="header">Phong lighting feedback</p>
            <p class="header placeholder">results will be displayed here</p>
        </div>
    </div>
  )
}

export default App;
