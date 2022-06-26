import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ViewDocument from './pages/ViewDocument';
import DocumentList from './pages/DocumentList';
import MyDocument from './pages/MyDocument';
import SignIn from './pages/SignIn';
import Subjects from './pages/Subjects';
import Students from './pages/Students';
import Lectures from './pages/Lectures';
import SemesterManagerment from './pages/SemesterManagerment';
import FinalProject from './pages/FinalProject';
import MyFinalProject from './pages/MyFinalProject';
import Classes from './pages/Classes';
import Class from './pages/Class';
import Meet from './pages/Meet';

function App() {
  return (
    <Routes>
      <Route path="/view-document/:id" element={<ViewDocument/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/meet/:id" element={<Meet/>}/>
      <Route path="/" element={<Layout/>}>
            <Route path="/document-list" element={<DocumentList />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/my-document" element={<MyDocument />} />
            <Route path="/students" element={<Students />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/semester-managerment" element={<SemesterManagerment />} />
            <Route path="/final-project" element={<FinalProject/>}/>
            <Route path="/my-final-project" element={<MyFinalProject/>}/>
            <Route path="/class" element={<Classes/>}/>
            <Route path="/class/:classid" element={<Class/>}/>


      </Route>
    
    </Routes>
  );
}

export default App;
