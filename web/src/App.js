import FacebookLogin from 'react-facebook-login';
import './App.css';

const responseFacebook = (response) => {
  console.log(response);
}

function App() {
  return (
    <div >
      <FacebookLogin
        appId="1604549929903991"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}/>
    </div>
  );
}


export default App;
