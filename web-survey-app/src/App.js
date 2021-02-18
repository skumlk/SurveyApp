import UnauehenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth } from "./services/auth";
import Header from "./Header";

function App() {

  const { user } = useAuth()

  return (
    <div className="App">
      <Header />
      { user ? <AuthenticatedApp /> : <UnauehenticatedApp />}
    </div>
  );
}

export default App;
