import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogOut"; //importing useLogout hook//
import { useAuthContext } from "../hooks/useAuthContext"; //importing useAuthContext hook//

const Navbar = () => {
  //Inside the handleClick function we are calling the logout function from the useLogout hook (line 8)//
  const { logout } = useLogout();
  //grabbing user from the useAuthContext hook (line 9)
  const { user } = useAuthContext();
  //creating the handleClick function (line 11)//
  const handleClick = () => {
    logout();
  };

  return (
    /*On (line 13) creating a div with a button with an onclick property,
    that has a handler for the log out button*/

    /*outputting the user next to the logout button (line 31)/, 
    so when the user logs in their username should appear next to the logout button*/

    <header>
      <div className="container">
        <Link to="/">
          <h1>ToDo</h1>
        </Link>
        <nav>
          {user && (
            /*first checking if the user exists and if they do we check if they have a value (line 30) 
             otherwise an error will appear because the user in null to begin with*/

            /*So basically if the user isn't null then we will output the username,
             next to the logout button*/
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user &&(
            /*Inside the div on line 45 we only want to see the signup and login links,
             if we don't have the user or if the user is not logged in*/
          <div>
            <Link to="/signin">SignIn</Link>
            <Link to="/signup">SignUp</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
