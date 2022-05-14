import logo from './logo.svg';
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
//import { Dialog } from 'primereact/dialog';
import { StudentList } from '../src/components/StudentList';
import TestPage from '../src/components/test';

function App() {
  return (
    <div className="App">
      <StudentList></StudentList>


      {/* <TestPage></TestPage> */}

    </div>
  );
}

export default App;
