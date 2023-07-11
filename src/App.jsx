import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { Inbox } from "./components/Inbox";
import { Spam } from "./components/Spam";
import { Bin } from "./components/Bin";
import { Error } from "./components/Error";
import { Details } from "./components/DetailsPage";
import icon from "./context&reducer/icons/y-Icon.jpg";
import { ToastContainer } from "react-toastify";
import { useMailContext } from "./context&reducer/MailProvider";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const {
    loginWithRedirect,
    isLoading,
    isAuthenticated,
    user,
    logout
  } = useAuth0();

  const {
    content: { bin, spam }
  } = useMailContext();
  const navlinkStyler = ({ isActive }) => {
    return {
      textDecoration: "none",
      position: "relative",
      color: "black",
      padding: "12px 40px",
      borderRadius: "0 12px 12px 0",
      fontSize: isActive && "18px",
      borderRight: isActive && "4px solid black",
      fontWeight: isActive && 750,
      backgroundColor: isActive && "#D3E3FD"
    };
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="App">
          <div className="navigationBar">
            <div className="logoSection">
              {" "}
              <img src={icon} alt="icon" className="icon" />
              <h1> YoMail!</h1>
            </div>

            <div className="links">
              <NavLink className="navlink" style={navlinkStyler} to="/">
                Inbox
              </NavLink>
              <NavLink className="navlink" style={navlinkStyler} to="/spam">
                Spam{" "}
                {spam.length > 0 && (
                  <span className="counter">({spam.length})</span>
                )}
              </NavLink>
              <NavLink className="navlink" style={navlinkStyler} to="/bin">
                Bin{" "}
                {bin.length > 0 && (
                  <span className="counter">({bin.length})</span>
                )}
              </NavLink>
              <button onClick={logout} className="logOutBtn navlink">
                Log Out
              </button>
            </div>
            <div className="footer">
              {!user?.picture ? (
                <span className="profileIcon">
                  {user?.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
              ) : (
                <span className="profileIconImage">
                  <img src={user.picture} alt={user.name} />
                </span>
              )}
              <span className="profileInfo">
                <h3>{user.name}</h3>
                <p style={{ fontSize: ".75rem", textDecoration: "italic" }}>
                  {user.email || user.nickname}
                </p>
              </span>
            </div>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Inbox />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/details/:mailId" element={<Details />} />
              <Route path="/spam" element={<Spam />} />
              <Route path="/bin" element={<Bin />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
        </div>
      ) : (
        <div className="loginPage">
          <h2>
            Please login to continue to{" "}
            <span
              style={{ color: "black", fontWeight: 800, fontSize: "1.5rem" }}
            >
              Yo-Mail
            </span>
            !
          </h2>
          <img
            src="https://res.cloudinary.com/yuvraj1905/image/upload/v1689025056/y-Icon_wuf35l.jpg"
            alt="YOLO icon"
          />
          <button onClick={loginWithRedirect}>Login</button>
        </div>
      )}
    </>
  );
}
