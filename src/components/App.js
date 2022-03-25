import React from "react";
import Admin from "./Admin/Admin";
import About from "./Login_Reg_Home/About/About";
import Home from "./Login_Reg_Home/Home";
import Login from "./Login_Reg_Home/Login";
import Signup from "./Login_Reg_Home/Signup";
import Regform from "./Login_Reg_Home/Regform";
import Chat from "./Chat/Chat";
import NoChat from "./Chat/NoChat";
import Forum from "./Forum/Forum";
import AddPost from "./Forum/AddPost";
import Comment from "./Forum/Comment";
import Announcement from "./Announcement/Announcement";
import MakeAnnouncement from "./Announcement/MakeAnnouncement";
import MakeFeedback from "./Feedback/CreateFeedback";
import Feedback from "./Feedback/Feedback";
import Thankyou from "./Feedback/Thankyou";
import ChatGroups from "./Chat/ChatGroups";
import Game from "./Chat/Game";
import Help from "./Chat/Help";
import ExitGroupCompleted from "./Chat/ExitGroupCompleted";
import PrivateRoute from "./PrivateRoute";
import MainAppBar from "./Login_Reg_Home/AppBar/MainAppBar";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/regform" component={Regform} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <PrivateRoute exact path="/NoChat" component={NoChat} />
          <PrivateRoute exact path="/Forum" component={Forum} />
          <PrivateRoute exact path="/addPost" component={AddPost} />
          <PrivateRoute exact path="/addComment" component={Comment} />
          <PrivateRoute exact path="/MakeAnnouncement" component={MakeAnnouncement} />
          <PrivateRoute exact path="/Announcement" component={Announcement} />
          <PrivateRoute exact path="/Feedback" component={Feedback} />
          <PrivateRoute exact path="/CreateFeedback" component={MakeFeedback} />
          <PrivateRoute exact path="/Thankyou" component={Thankyou} />
          <PrivateRoute exact path="/ChatGroups" component={ChatGroups} />
          <PrivateRoute exact path="/Game" component={Game} />
          <PrivateRoute exact path="/ExitGroupCompleted" component={ExitGroupCompleted} />
          <PrivateRoute exact path="/MainAppBar" component={MainAppBar} />
          <PrivateRoute exact path="/Help" component={Help} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
