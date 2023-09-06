import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const SignIn = (props) => {
  return (
    <Authenticator socialProviders={["amazon", "apple", "facebook", "google"]}>
      {({ signOut, user }) => <Navigate to={"/"} />}
    </Authenticator>
  );
};
export default SignIn;
