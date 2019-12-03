import React from "react";
import { AppBar, Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { State } from "../../src/store/reducers";

interface IProps {
  currentUser: string;
}
class Header extends React.Component<IProps, any, any> {
  render() {
    return (
      <Grid container direction="row" justify="flex-start">
        <Grid item style={{ width: 2062 }}>
          <AppBar position="relative" style={{ alignItems: "center" }}>
            <span style={{ fontSize: 70, fontWeight: "lighter" }}>
              Welcome to Global Chat 💬
            </span>
          </AppBar>
        </Grid>
        <Grid item>
          <button
            style={{ fontSize: 40, height: 93, backgroundColor: "#3C51AD" }}
          >
            ⛔
          </button>
        </Grid>

        <Grid container direction="row" justify="flex-end"></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: State) => ({
  user: state.messages.currentUser
});

export const HeaderContainer = connect(mapStateToProps)(Header);
