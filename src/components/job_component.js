import {useEffect, useState} from 'react';
import axios from "axios";
import '../css/job_component.css';
import AlertComponent from './alert_component';
import { Link } from 'react-router-dom';

export default function JobComponent(){
  const [job, setJobs] = useState([]);
  const [storeData, setStoredData] = useState([]);
  const [state, setState] = useState(0);
  const [option, setOption] = useState("All")
  const [emptyMessage, setEmptyMessage] = useState('Ooops!! No records.')
  const [alertMessage, setAlertMessage] = useState("")
  const [alertFired, setAlertFired] = useState(false)
  const [color, setColor] = useState('green')
  const [editable, setEditable] = useState();
  const [getID, setGetID] = useState(999);
  const [inputJobName, setInputJobName] = useState("")
  const [inputJobDescription, setInputJobDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/joblist")
      .then((response) => {
        setJobs(response.data);
        if(option==="All"){
          setStoredData(response.data);
        }
        else if(option==="Completed"){
          const filterCompleted= job.filter((data)=> data.status==="Completed")
          if(filterCompleted.length>1)
            setStoredData(filterCompleted)
          else {
            console.log('Completed Status is empty.')
            setStoredData(filterCompleted)
            setEmptyMessage("Ooops!! No records.");
          } 
        }
        else if(option==="InProgress"){
          const filterProgress = job.filter((data) => data.status === "InProgress")
          setStoredData(filterProgress)
          setEmptyMessage("Ooops!! No records.");
        }
      }) 
      .catch((error) => {
        console.log(error);
      });

  }, [state, option]);

  let handleStatus = (job) => {
    axios
      .put(`http://localhost:4000/api/update`, {
        jobId: job.jobid,
        status_bool: !job.status_bool,
      })
      .then((response) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
    setState((state) => state + 1);
  };

  let handleEdit = (obj) => {
    setInputJobName("")
    setInputJobDescription("")
    setEditable(!editable)
    setGetID(obj)
  }


  let handleDelete = (job) => {
    if(window.confirm(`Want to delete record ${job.jobid} ?`)){
      axios
        .delete(`http://localhost:4000/api/delete/${job.jobid}`)
        .then((response) => {
          console.log("Data deleted successfully");
        })
        .catch((err) => {
          console.log("DELETION ERROR:\n", err);
        });
      setAlertMessage("Record Deleted.")
      setAlertFired(true)
      setColor('green')
      setTimeout(()=>{
        setAlertFired(false)
      }, 3000)
      setState((state) => state + 1);
    }
    else{
      console.log('CANCEL DELETION')
      setAlertFired(true)
      setColor('red')
      setTimeout(() => {
        setAlertFired(false);
      }, 3000);
      setAlertMessage("Record deletion cancelled")
    }
  }

  // SAVE CHANGES METHOD
  let handleSave = (obj) => {
    if(inputJobName.length && inputJobDescription.length){
      console.log('IF BLOCK')
      axios
        .put(`http://localhost:4000/api/update_record`, {
          jobId: obj.jobid,
          job_name: inputJobName,
          job_desc: inputJobDescription
        })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

        setInputJobName("")
        setInputJobDescription("")
        setAlertFired(true)
        setColor('green')
        setAlertMessage("Updated record successfully.");
        setTimeout(()=>{
          setAlertFired(false)
        }, 5000)
        setState(state=> state+1)
    }
    else{
      setInputJobName("");
      setInputJobDescription("");
      setAlertFired(true)
      setColor('yellow')
      setAlertMessage("Fields cannot be empty.");
      setTimeout(()=>{
        // setting alertFired to false after 5000ms.
        setAlertFired(false)
      },5000)
      setState(state=> state+1)
    }
  }

  // Filtering Jobs for dropdown option (Show All)
  let filterContent = () => {
    setJobs(storeData);
    setOption("All")
  };

  // Filtering Jobs for dropdown option (status: Completed)
  let filterCompleted = () => {
    let filterCompleted = job.filter((obj) => obj.status === "Completed");
    setJobs(filterCompleted);
    setOption("Completed")
  };

  // Filtering Jobs for dropdown option (status: In Progress)
  let filterProgress = () => {
    let filterProgress = job.filter((obj) => obj.status === "InProgress");
    setJobs(filterProgress);
    setOption("InProgress")
  };

  return (
    <div className="container">
      <div className="top-menu">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle btn-lg"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Status
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#" onClick={filterContent}>
                Show All
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={filterCompleted}>
                Completed
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={filterProgress}>
                In Progress
              </a>
            </li>
          </ul>
        </div>

        <button
          className="btn btn-secondary btn-lg insert"
          title="Insert Record"
        >
          <Link to="/post">
            <i class="fa fa-plus" style={{ color: "white" }}></i>
          </Link>
        </button>
      </div>

      <div className="scrollbar">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          {storeData.length ? (
            <tbody>
              {storeData.map((obj) => {
                return (
                  <tr key={obj.jobid} title={obj.jobid}>
                    <td>{obj.jobid}</td>
                    {editable && obj.jobid === getID ? (
                      <td>
                        <input
                          type="text"
                          value={inputJobName}
                          onChange={(e) => setInputJobName(e.target.value)}
                          placeholder={obj.jobename}
                          className="form-control editable-jobName"
                          spellCheck="true"
                        />
                      </td>
                    ) : (
                      <td>{obj.jobename}</td>
                    )}
                    {editable && obj.jobid === getID ? (
                      <td>
                        <input
                          type="text"
                          value={inputJobDescription}
                          onChange={(e) =>
                            setInputJobDescription(e.target.value)
                          }
                          placeholder={obj.jobdescription}
                          className="form-control editable-jobDesc"
                          spellCheck="true"
                        />
                      </td>
                    ) : (
                      <td>{obj.jobdescription}</td>
                    )}
                    <td>{obj.status}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        title="Change Status"
                        onClick={() => handleStatus(obj)}
                      >
                        <i
                          className="fa fa-exchange"
                          aria-hidden="true"
                          style={{ marginLeft: "1%" }}
                        ></i>
                      </button>

                      <button
                        className="btn btn-warning warning"
                        title="Edit"
                        onClick={() => handleEdit(obj.jobid)}
                      >
                        <a className="a-link" itemdata={obj}>
                          <i
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </button>

                      <button
                        className="btn btn-danger danger"
                        title="Delete"
                        onClick={() => handleDelete(obj)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>

                      <button
                        className="btn btn-success success"
                        title="Save Changes"
                        onClick={() => handleSave(obj)}
                      >
                        <i className="fa fa-save"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="EmptyMessage" colSpan={5}>
                  <h2>{emptyMessage}</h2>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {alertFired ? (
        <AlertComponent item={alertMessage} color={color} />
      ) : (
        <h1></h1>
      )}
    </div>
  );
}