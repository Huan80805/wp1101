import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import { displayStatus } from "./App"
import { useState} from "react";
// handle signin and sign up
const SignIn = ({ me, setMe, setSignedIn}) => {
  return(
  <>
    <Title>
      <h1>My Chat Room</h1>
    </Title>
    <Input.Search
      prefix={<UserOutlined />}
      value={me} enterButton="Sign In"
      onChange={(e) => setMe(e.target.value)}
      placeholder="Username"
      size="large" style={{ width: 300, marginBottom: 10}}
      onSearch={(me) => {
        if (!me)
          displayStatus({
            type: "error",
            msg: "Missing username or password",
          });
        else {
          setSignedIn(true)
        }
      }}
    />
    {/* <Button type="primary" size="large" onClick={()=> setSignedUp(true)}>
    Sign Up Now
    </Button>  */}
  </>
  )
};
export default SignIn;
