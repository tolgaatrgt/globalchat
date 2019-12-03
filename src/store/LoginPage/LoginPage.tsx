import React from "react";
import { Grid, Button } from "@material-ui/core";
import { HeaderContainer } from "../Header";
import { ChatPageContainer } from "../ChatPage/ChatPageContainer";
import { IUsers } from "./reducers";

interface IState {
  isLogged: boolean;
  nickname: string;
}
interface Props {
  setUser: (username: string) => void;
  AddUser: (users: IUsers[]) => void;
  getUsers: () => void;
  users: IUsers[];
}

export class Login extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = { isLogged: false, nickname: "" };
  }
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    if (!this.state.isLogged) {
      return (
        <>
          <HeaderContainer currentUser={""} />
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <div
                style={{
                  fontFamily: "Impact, Charcoal, sans-serif",
                  fontSize: 100,
                  marginTop: 200,
                  color: "Crimson"
                }}
              >
                ENTER YOUR NICK NAME
              </div>
              <Grid item>
                <input
                  onChange={this.handleNick}
                  style={{
                    marginTop: 70,
                    fontSize: 100,
                    border: "0px",
                    backgroundColor: "#f6f6f6",
                    paddingLeft: "40px"
                  }}
                  placeholder=".."
                />
              </Grid>
              <Button
                onClick={this.loginClick}
                variant="outlined"
                color="inherit"
                style={{ marginTop: 80, fontSize: 40 }}
              >
                START
              </Button>
            </Grid>
          </Grid>
        </>
      );
    } else return <ChatPageContainer />;
  }
  handleNick = (e: any) => {
    this.setState({
      nickname: e.target.value
    });
  };

  loginClick = () => {
    let isLogged = this.state.isLogged;
    this.setState({ isLogged: !isLogged });
    this.props.setUser(this.state.nickname);
    if (
      this.props.users.filter(user => user.name === this.state.nickname)
        .length === 0
    ) {
      this.props.AddUser([{ name: this.state.nickname, status: "✅" }]);
    }
  };
}
