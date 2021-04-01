
import React from "react"
import { Link } from "react-router-dom";
import { useAuth } from "./services/auth";

function Header() {

  const { user, logout } = useAuth()

  return (
    <div className="py-5 text-white bg-black flex flex-row justify-between	">
      <div className="ml-5 text-2xl" ><Link to="/">Next Survey</Link></div>
      {user && <button className="mr-5" onClick={() => logout()}>Logout</button>}
    </div>
  );
}

export default Header;
