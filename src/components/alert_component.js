 import { useState, useEffect } from 'react';

 export default function AlertComponent(props){

    const [alertMsg, setAlertMsg] = useState(props.item)
    const [color, setColor] = useState(props.color)


    return (
      <div style={{ marginTop: "0.8%" }}>
        {color === "green" ? (
          <div className="alert alert-success" role="alert">
            {alertMsg}
          </div>
        ) : (
          <h6></h6>
        )}

        {color === "yellow" ? (
          <div className="alert alert-warning" role="alert">
            {alertMsg}
          </div>
        ) : (
          <h6></h6>
        )}

        {color === "red" ? (
          <div className="alert alert-danger" role="alert">
            {alertMsg}
          </div>
        ) : (
          <h6></h6>
        )}
      </div>
    );
 }
