import { Link, Route, Routes } from 'react-router-dom';
import SideBar from './components/sidebar/SideBar';
import TopBar from './components/topbar/TopBar';
import DocumentList from './pages/DocumentList';
import MyDocument from './pages/MyDocument';


function App() {
  return (
    <div className="App">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="page">
          <Routes>
            <Route path="/document-list" element={<DocumentList />} />
            <Route path="/my-document" element={<MyDocument />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
