import './App.css';
import JobComponent from './components/job_component';
import { BrowserRouter, Route } from 'react-router-dom';
import PostComponent from './components/post_component';

function App() {
  return (
   <div>
     <h1>Job Portal</h1>
     <br/>
     
      <BrowserRouter>
        <Route exact path="/" component={JobComponent} />
        <Route exact path="/post" component={PostComponent} />
      </BrowserRouter>
   </div>
  );
}

export default App;
