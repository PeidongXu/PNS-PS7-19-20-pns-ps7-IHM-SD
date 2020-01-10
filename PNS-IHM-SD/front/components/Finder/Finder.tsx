import React, { Component } from "react";
import { Container, Content } from "native-base";

//Components
import MenuItem from "../Menu/Menu";

//Styles
import styles from "./style";
class Finder extends Component {
  render() {
    //const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <MenuItem/>
        </Content>
      </Container>
    );
  }
}

export default Finder;
