import React from "react";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
// import Sample from './SampleBackend'

function Header({ authState }) {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    authState;

  // console.log(user.email);

  return (
    <div className="bg-gray-100 rounded-bl-xl rounded-br-xl p-3 font-bold drop-shadow-2xl text-gray-900 flex justify-between">
      <div className="logo text-shadow text-blue-800 my-auto text-md md:text-3xl lg:text-3xl">
        Certificates Hub
      </div>

      <div className="auth flex justify-center align-middle items-center gap-2">
        {isAuthenticated ? (
          <>
            {/* <p>{user.email}</p> */}
            {/* <Sample userEmail={user.email} /> */}
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <div className="button hover:bg-gradient-to-r from-gray-100 to-gray-300 flex justify-center align-middle items-center gap-2 border-2 p-2 px-3 rounded-3xl">
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-in-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.5 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V2zm-1.5 4a.5.5 0 0 0-1 0v4a.5.5 0 0 0 1 0V6zm8.854.354a.5.5 0 0 0 0-.708l-2.5-2.5a.5.5 0 0 0-.708.708L12.293 5.5H3.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l2.5-2.5z"
                  />
                </svg>
              </div>
            </button>
            <img
              className="rounded-md"
              src={user.picture}
              alt=""
              width="32px"
            />
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>
            <div className="button border-2 flex justify-center hover:bg-gradient-to-r from-gray-100 to-gray-300 items-center gap-2 p-2 px-3 rounded-3xl">
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
