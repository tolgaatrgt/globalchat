import React from "react";
import { HeaderContainer } from "../Header";
import {
  Input,
  Grid,
  Button,
  Card,
  Paper,
  Typography
} from "@material-ui/core";
import { IMessage, IPersonalMessage } from "./reducers";
import { IUsers } from "../LoginPage/reducers";
import { ChatWindow } from "./ChatWindow";
import DropDownComponent from "../DropDown";
import Image from "../../img/main.jpg";
interface IState {
  isOpen: boolean;
  userinput: string;
  input: string;
  dmInput: string;
  currentUserWithInput: string;
  currentChat: string;
}
interface Props {
  users: IUsers[];
  messages: IMessage[];
  personalmessages: IPersonalMessage[];
  user: string;
  getMessages: () => void;
  getDm: () => void;
  sendMessage: (messages: IMessage) => void;
  sendDm: (personalmessages: IPersonalMessage) => void;
  getUsers: () => void;
}
let today = new Date();
export class Chat extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: "",
      dmInput: "",
      currentUserWithInput: "",
      userinput: "",
      isOpen: false,
      currentChat: "global"
    };
  }

  public componentDidMount() {
    this.timer = setInterval(() => {
      this.props.getMessages();
      this.props.getDm();
      this.props.getUsers();
    }, 1000);
  }

  public componentWillUnmount() {
    if (!this.timer) return;

    clearInterval(this.timer);
  }

  handleMessageInput = (e: any) => {
    this.setState({
      input: e.target.value
    });
  };
  handleDmInput = (e: any) => {
    this.setState({
      dmInput: e.target.value
    });
  };
  handleuserinput = (e: any) => {
    this.setState({
      userinput: e.target.value
    });
  };
  render() {
    return (
      <>
        <HeaderContainer currentUser={this.props.user} />
        <Grid //ROOT GRID FOR ALL SCREEN
          container
          direction="row"
          style={{
            width: 2133,
            backgroundColor: "#EFD7CD",
            padding: 10
          }}
        >
          <Grid
            item
            style={{
              padding: 13,
              marginRight: 10,
              backgroundColor: "#F2F6ED",
              borderRadius: 30
            }}
          >
            <Card>
              <Grid //  GRID THAT SHOWS ALL USERS
                alignItems="center"
                wrap="nowrap"
                container
                direction="column"
                style={{ height: 830, width: 300, overflowY: "auto" }}
              >
                <h2>ALL USERS 😛</h2>
                {this.showUsers()}
              </Grid>
              <Grid container direction="row" justify="flex-start">
                <Grid item style={{ margin: 3 }}>
                  <Grid container direction="row">
                    <Input
                      placeholder="find user"
                      onChange={this.handleuserinput}
                    />
                    <Button
                      onClick={() => this.setState({ currentChat: "global" })}
                      style={{ fontSize: 20 }}
                    >
                      🌍
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid
            item
            style={{
              padding: 13,
              backgroundColor: "#F2F6ED",
              borderRadius: 30
            }}
          >
            {this.renderMessageScreen()}
            <Input
              onChange={this.handleMessageInput}
              placeholder="Your message here.."
              style={{ fontSize: 30, margin: 20 }}
            />
            <Button
              variant="outlined"
              onClick={() =>
                this.state.currentChat === "global"
                  ? this.props.sendMessage({
                      text: this.state.input,
                      nickname: this.props.user,
                      time: today.getHours() + ":" + today.getMinutes()
                    })
                  : this.props.sendDm({
                      text: this.state.input,
                      receiver: this.state.currentChat,
                      time: today.getHours() + ":" + today.getMinutes(),
                      whosend: this.props.user
                    })
              }
              style={{
                fontSize: 20,
                backgroundColor: "orange",
                marginLeft: 10
              }}
            >
              Send
            </Button>
          </Grid>
          <Grid
            item
            style={{ marginTop: 55, marginLeft: 40 }}
            justify="flex-end"
          >
            <span>{this.props.user}</span>
            <DropDownComponent />
          </Grid>
        </Grid>
      </>
    );
  }

  decideMessages = () =>
    this.state.currentChat === "global"
      ? this.props.messages
      : this.props.personalmessages.filter(
          msg =>
            (msg.receiver === this.state.currentChat &&
              this.props.user === msg.whosend) ||
            (msg.whosend === this.state.currentChat &&
              msg.receiver === this.props.user)
        );

  private timer: NodeJS.Timeout | undefined;

  renderMessageScreen = () => {
    const { messages, user } = this.props;
    const styles = {
      paperContainer: {
        backgroundImage: `url(${Image})`,
        marginBottom: 10
      }
    };
    return (
      <>
        <Card style={styles.paperContainer}>
          <Grid // GRID THAT SHOWS GLOBAL MESSAGES
            container
            direction="column"
            style={{ height: 800, width: 1550, overflowY: "auto" }}
          >
            <div style={{ marginLeft: 10 }}>
              <ChatWindow
                messages={this.decideMessages()}
                user={user}
                currentChat={this.state.currentChat}
              />
            </div>
          </Grid>
        </Card>
      </>
    );
  };

  showUsers = () => {
    const { users } = this.props;
    let array = [];
    let length = users.length;
    for (let i = 0; i < length; i++) {
      array.push({ name: users[i].name, status: users[i].status });
    }
    let newarray = new Set(array);
    let a = Array.from(newarray)
      .filter(item => item.name != this.props.user)
      .filter(item => item.name.length != 0);
    let b = a.filter(user => user.name.includes(this.state.userinput));

    return b.map(user => {
      return (
        <Grid item>
          <Grid
            justify="space-between"
            container
            direction="row"
            style={{
              backgroundColor: "#eceba7",
              width: 250,
              height: 85,
              borderRadius: 10,
              margin: 10
            }}
          >
            <React.Fragment key={user.name}>
              <div
                style={{
                  color: "#A36254",
                  fontFamily: "Tahoma, Geneva, sans-serif",
                  fontSize: 20,
                  padding: "25px"
                }}
              >
                {user.name}
                <span style={{ marginLeft: 10 }}>{user.status}</span>
              </div>
            </React.Fragment>

            <Button
              onClick={() => this.dmClick(user.name)}
              style={{ fontSize: 40 }}
            >
              ✉️
            </Button>
          </Grid>
        </Grid>
      );
    });
  };

  dmClick = (user: string) => {
    this.setState({ currentChat: user });
  };

  openDm = () => {
    this.setState({ isOpen: true });
  };

  renderDmPage = () => {
    if (this.state.isOpen == true) {
      const { personalmessages } = this.props;
      return personalmessages
        .filter(dm => dm.whosend)
        .map(dm => {
          return (
            <>
              <Grid container direction="row" justify="flex-start">
                <Paper style={{ width: 200 }}>
                  <Typography
                    style={{ borderRadius: 4, backgroundColor: "#eceba7" }}
                  >
                    <strong>{dm.receiver}</strong>
                  </Typography>
                  <Typography style={{ fontSize: 20, color: "#000272" }}>
                    {dm.text}
                  </Typography>
                  <Typography>{dm.time}</Typography>
                </Paper>
              </Grid>
              <p />
            </>
          );
        });
    }
  };
}
