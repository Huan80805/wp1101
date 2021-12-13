import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import { displayStatus } from "./ChatRoom";
const SignIn = ({ name, setName, setSignedIn }) => (
  <>
    <Title>
      <h1>My Chat Room</h1>
    </Title>
    <Input.Search
      prefix={<UserOutlined />}
      value={name} enterButton="Sign In"
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
      size="large" style={{ width: 300, margin: 50 }}
      onSearch={(name) => {
        if (!name)
          displayStatus({
            type: "error",
            msg: "Missing user name",
          });
        else setSignedIn(true);
      }}

    />
  </>
);
export default SignIn;
