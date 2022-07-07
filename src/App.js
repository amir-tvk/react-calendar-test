import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from 'axios'


import logo from './logo.svg';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './App.css';

moment.locale('en-CEST');
BigCalendar.momentLocalizer(moment);

class App extends Component {

  

  constructor(props) {
    super(props)

    this.state = {
      cal_events: [
        //State is updated via componentDidMount
      ],
    }

  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }



  componentDidMount() {

    let config = {
      method: 'get',
      url: 'http://localhost:8380/api/schedule?start=2022-07-05T01:01:29&end=2022-07-06T22:22:30&page=0&size=10',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMUTE1ZWZmb0tvNjUwNWJocWtHYld0aFRDVFZOYS1TQ1d1Y0RKLXVfQ25jIn0.eyJleHAiOjE2NTY5NzkwMzYsImlhdCI6MTY1Njk3ODczNiwianRpIjoiYTMyMWFiMzItNWFhOS00YTU4LWJiYzctNTE5MmUxNjdkN2JhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL2hvdmVyZmxvLXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjhmNGI3YzQzLTAxZjQtNGE1ZS04YTRkLWYwMjlkODI3OTRkMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImhvdmVyZmxvLXBrY2UtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6Ijk5OWZiM2UyLWIzZWMtNDg2My04ZmIyLTlmNjE0Y2VmMGE4NyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtaG92ZXJmbG93LXJlYWxtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRmlyc3ROYW1lIExhc3ROYW1lIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGV2QGhvdmVyZmxvLmNvbSIsImdpdmVuX25hbWUiOiJGaXJzdE5hbWUiLCJmYW1pbHlfbmFtZSI6Ikxhc3ROYW1lIiwiZW1haWwiOiJkZXZAaG92ZXJmbG8uY29tIn0.RHOP2qhB42oRKFsYcHeCTSYs3azJDSezgHhLI4lNIDJIc9WhWeF7ZrLIbmbYI5eDOAaEi3RSeiSQzkqsjUcRRdAvV7vqAkHF-vMQyz5u9GNkonuUCoNvWNa1GATeev9sPMrDyhov1-M7SnOntzk-6D2KeDCWGXTNXnzQe7RdWehTREAWizb5g-gtTXcSfHcZrCGjv8bmn2iXoCuuLkjdKuIqtZ0Ah2_pXf235VW9QXPIsFL3Y1eZoRcNtZRUEAR-mlK1yQRMcHT3qutH0vzd0ONC0W3z94heSN_rYrumgkC-OK8rnwqdsyI19hWq-ebyIVr8PSR37kOTuo8OhmmQww'
      }
    };

    axios(config)
      .then(response => {
        console.log(response.data);
        let appointments = response.data;
        
        for (let i = 0; i < appointments.length; i++) {
          
          appointments[i].start = this.convertDate(appointments[i].start)
          appointments[i].end = this.convertDate(appointments[i].end)
          appointments[i].title = "Sky diving"
          
        }

        this.setState({
          cal_events:appointments
        })
  
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {

    const { cal_events } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <BigCalendar
            events={cal_events}
            step={30}
            defaultView='week'
            views={['month','week','day']}
            defaultDate={new Date()}
          />
        </div>
      </div>
    );
  }
}

export default App;
