import UnauehenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth } from "./services/auth";
import Header from "./Header";
import UnauthenticatedApp from "./UnauthenticatedApp";
import "./styles/style.scss"

function App() {

  const { user } = useAuth()

  return (
    <div className="App">
      <Header/>
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
