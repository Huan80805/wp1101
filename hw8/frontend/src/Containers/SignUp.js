import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import { displayStatus } from "./App"
import { useState} from "react";
const SignUp = ({setSignedUp, sendSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassWord] = useState('');
  return(
  <>
    <Title>
      <h1>Sign Up</h1>
    </Title>
    <Input
        prefix={<UserOutlined />}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="large" style={{ width: 300, marginBottom: 10 }}
    ></Input>
    <Input.Search
      prefix={<UserOutlined />}
      value={password} enterButton="Sign Up"
      onChange={(e) => setPassWord(e.target.value)}
      placeholder="Password"
      size="large" style={{ width: 300, marginBottom:10}}
      onSearch={(password) => {
        if ((!username) || (!password)){
          displayStatus({
            type: "error",
            msg: "Missing username or password",
          });
        }
        else {
            // setSignedUp(false);
            sendSignUp(username, password)
        }
      }}

    />
    <Button type="primary" size="large" onClick={()=> setSignedUp(false)}>
    Back to Sign In
    </Button> 
  </>
  )
}
export default SignUp;
