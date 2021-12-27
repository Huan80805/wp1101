import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import { displayStatus } from "./App"
import { useState} from "react";
// handle signin and sign up
const SignIn = ({ me, setMe, setSignedIn}) => {
  const [password, setPassword] = useState('')
  return(
  <>
    <Title>
      <h1>My Chat Room</h1>
    </Title>
    <Input
        prefix={<UserOutlined />}
        placeholder="Username"
        value={me}
        onChange={(e) => setMe(e.target.value)}
        size="large" style={{ width: 300, marginBottom: 10 }}
    ></Input>
    <Input.Search
      prefix={<UserOutlined />}
      value={password} enterButton="Sign In"
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      size="large" style={{ width: 300, marginBottom: 10}}
      onSearch={(password) => {
        if ((!password) || (!me))
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
