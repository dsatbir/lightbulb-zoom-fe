import './App.css';
import React,{useState} from "react";
import axios from "axios";
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';



function App() {

  const [meetingNumber,setmeetingNumber] = useState("");

  const client = ZoomMtgEmbedded.createClient();

  var signatureEndpoint = 'http://localhost:8000/zoomapi/create-signature'
  var sdkKey = ''
  // var meetingNumber = '123456789'
  var role = 0
  var userName = 'React'
  var userEmail = ''
  var passWord = ''
  var registrantToken = ''


  const  createMeeting = async (e) => {
    e.preventDefault();
    try {

      const config = {
        headers: {
          "content-type":"multipart/form-data"
        }
      }

      let result = await axios.get("http://localhost:8000/zoomapi/createMeeting",config);

      console.log(result.data.response.id);
      setmeetingNumber(result.data.response.id)
      console.log(result);
      
    } catch (error) {
      
      console.log(error);
    }

    
  }



  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: "9051365648",
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      console.log(response.signature,"this is 63");

      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    console.log("this is 71",signature);
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });

    client.join({
    	sdkKey: "3jr9UHqX7PNQNmmPq5M8NkiQ7UgMFse24EFD",
    	signature: signature,
    	meetingNumber: "9051365648",
    	password: "451396",
    	userName: "satbir",
      // userEmail: userEmail,
      // tk: registrantToken
    })
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       {/* <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p> */}
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"  
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (
    <div className="App">
      <main>
      <div id="meetingSDKElement">
          Zoom Meeting SDK 
        </div>

        <button onClick={createMeeting}>Create Meeting</button>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
