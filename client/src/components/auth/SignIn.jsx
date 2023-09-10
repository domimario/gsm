import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { Hub } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const SignIn = (props) => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    checkAuthenticated();
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        window.location.reload();
      }
    });
  }, []);

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="sing-cont">
          <h1>Hello {user.attributes.email}</h1>
          <button onClick={signOut}>
            {" "}
            <i class="fa-solid fa-right-from-bracket fa-lg"></i> Sign out
          </button>
        </div>
      )}
    </Authenticator>
  );
};
export default SignIn;
