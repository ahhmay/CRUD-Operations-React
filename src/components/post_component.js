import '../css/post_component.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AlertComponent from './alert_component';

export default function PostComponent(props){

    let history = useHistory()
    const [id, setID] = useState(9999)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState('green')
    const [alertMsg , setAlertMsg] = useState('')
    const [alertFired, setAlertFired] = useState(false)
    const STATUS = "InProgress"
    const status_bool = false

    let handlePost = () => {
        axios.post('http://localhost:4000/api/post', {
          jobid: id,
          jobename: name,
          jobdescription: description,
          status: STATUS,
          status_bool: status_bool 
        })
        .then(response=>{
          
          setAlertMsg(response.data)
          setColor('green')
          setAlertFired(true)
          setTimeout(()=>{
            setAlertFired(false);
            
          },5000)
          history.goBack();
        })
        .catch(error=>{
          setColor('red')
          setAlertMsg('Error Inserting Data.')
          setAlertFired(true);
          setTimeout(() => {
            setAlertFired(false);
          },5000);
          console.log("Record Insertion Failed.", error);
        })   
        
    }


    return (
      <div className="container">
        <form className="post-form">
          <div className="form-group column">
            <div>
              <h2>Post Information</h2>
            </div>
            <div className="col-lg-4 col-xs-2 center">
              <label className="form-label  input-label">Job ID</label>
              <input
                type="number"
                className="form-control input-field"
                placeholder="Generated Automatically"
                onChange={(e) => setID(e.target.value)}
                disabled
              />
            </div>
            <div className="col-lg-4 col-xs-2 center">
              <label className="form-label  input-label">Job Name</label>
              <input
                type="text"
                className="form-control input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-xs-2 center">
              <label className="form-label  input-label">Job Description</label>
              <input
                type="text"
                className="form-control input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-xs-2 center">
              <label className="form-label  input-label">Job Status</label>
              <input
                type="text"
                value="InProgress"
                className="form-control input-field"
                disabled
              />
            </div>
            <div className="col-lg-4 col-xs-2 center">
              <label className="form-label  input-label">Status Boolean</label>
              <input
                type="text"
                value="false"
                className="form-control input-field"
                disabled
              />
            </div>
            <div className="col-lg-4 col-xs-2 post-button center">
              <button className="btn btn-secondary input-field" onClick={() => handlePost()}>INSERT</button>
            </div>
          </div>
        </form>

        {alertFired ? <AlertComponent color={color} item={alertMsg}/> : <h6></h6>}
      </div>
    );
}