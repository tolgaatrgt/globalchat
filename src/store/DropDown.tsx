import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = ["✅", "🕘", "⭕"];

interface IState {
  selected: string;
}

class DropDownComponent extends React.Component<any, any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: "✅"
    };
  }
  onStatusChange = () => {
    // lokal statei updatele
    // axios ile post / update kullanarak statusu degistir
  };
  render() {
    const defaultOption = this.state.selected;
    return (
      <Dropdown
        options={options}
        onChange={e => this.setState({ selected: e })}
        value={defaultOption}
        placeholder="Status"
      />
    );
  }
}

export default DropDownComponent;
