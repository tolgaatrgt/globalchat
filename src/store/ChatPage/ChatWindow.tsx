import * as React from "react";
import { IMessage, IPersonalMessage } from "./reducers";
import { Grid, Paper, Typography } from "@material-ui/core";

interface Props {
  messages: IMessage[] | IPersonalMessage[];
  user: string;
  currentChat: string;
}

export class ChatWindow extends React.PureComponent<Props> {
  public render() {
    return (
      <Grid container direction="column">
        {this.renderMessageRows()}
      </Grid>
    );
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  private renderMessageRows = () => {
    const { messages } = this.props;

    return (
      <>
        <Grid container justify="center">
          <h2>
            {this.props.currentChat === "global" ? (
              <span style={{ position: "absolute", right: 900 }}>
                GLOBAL ROOM 🌍{" "}
              </span>
            ) : (
              <span style={{ position: "absolute", right: 950 }}>
                {this.props.currentChat}
              </span>
            )}
          </h2>
        </Grid>
        {this.props.currentChat === "global"
          ? (messages as IMessage[]).map(m =>
              this.renderMessageRow<IMessage>(m)
            )
          : (messages as IPersonalMessage[]).map(m =>
              this.renderMessageRow<IPersonalMessage>(m)
            )}
      </>
    );
  };

  private renderMessageRow = <T extends unknown>(message: T) => {
    const { user } = this.props;

    let isRightSide;
    if (this.props.currentChat === "global") {
      isRightSide = (message as IMessage).nickname === user;
    } else {
      isRightSide = (message as IPersonalMessage).whosend === user;
    }

    if (isRightSide) {
      return (
        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Paper style={{ borderRadius: 14, width: 200, margin: 10 }}>
              <Typography
                style={{ borderRadius: 8, backgroundColor: "#64c4ed" }}
              >
                <strong>
                  {this.props.currentChat === "global"
                    ? (message as IMessage).nickname
                    : (message as IPersonalMessage).whosend}
                  :
                </strong>
              </Typography>
              <Typography style={{ fontSize: 20, color: "#000272" }}>
                {(message as IMessage).text}
              </Typography>
              <Typography>{(message as IMessage).time}</Typography>
            </Paper>
          </Grid>
          <p />
        </Grid>
      );
    } else
      return (
        <>
          <Grid item>
            <Grid container direction="row" justify="flex-start">
              <Paper style={{ width: 200, margin: 10 }}>
                <Typography
                  style={{ borderRadius: 4, backgroundColor: "#eceba7" }}
                >
                  <strong>
                    {this.props.currentChat === "global"
                      ? (message as IMessage).nickname
                      : (message as IPersonalMessage).whosend}
                    :
                  </strong>
                </Typography>
                <Typography style={{ fontSize: 20, color: "#000272" }}>
                  {(message as IMessage).text}
                </Typography>
                <Typography>{(message as IMessage).time}</Typography>
              </Paper>
            </Grid>
            <p />
          </Grid>
        </>
      );
  };
}
