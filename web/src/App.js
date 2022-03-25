import FacebookLogin from 'react-facebook-login';
import axios from 'axios';


const responseFacebook = async (response) => {
  if(response.accessToken){
    console.log('log in with access_Token=' + response.accessToken)
    let result = await axios.post('http://localhost:8080/api/login', {
      token: response.accessToken
    })
    console.log(result.data)
  }
}

const callInfoAPI = async () => {
  let result = await axios.get('http://localhost:8080/api/info')
  console.log(result.data)
}


function App() {
  return (
    <div >
      <FacebookLogin
        appId="649218682992262"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}/>
        <button onClick={callInfoAPI}>TO-info</button>
    </div>
  );
}

export default App;
