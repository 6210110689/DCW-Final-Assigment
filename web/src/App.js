import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


// axios.interceptors.request.use(function(config){
//   const token = sessionStorage.getItem('access_token')
//   config.headers['Authorization'] = `Bearer ${token}`
//   return config
// }, function(err){
//   return Promise.reject(err)
// })


// const responseFacebook = async (response) => {
//   if(response.accessToken){
//     console.log('log in with access_Token=' + response.accessToken)
//     let result = await axios.post('http://localhost:8080/api/login', {
//       token: response.accessToken
//     })
//     console.log(result.data)
//   }
// }

// const callInfoAPI = async () => {
//   let result = await axios.get('http://localhost:8080/api/info')
//   console.log(result.data)
// }


function App() {
  const { user } = useContext(Context);
  return (
    // <div >
    //   <FacebookLogin
    //     appId="649218682992262"
    //     autoLoad={true}
    //     fields="name,email,picture"
    //     callback={responseFacebook}/>
    //     <button onClick={callInfoAPI}>TO-info</button>
    // </div>
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
