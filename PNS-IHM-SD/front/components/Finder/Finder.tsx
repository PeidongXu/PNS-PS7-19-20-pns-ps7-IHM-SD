import React, { Component } from "react";
import { Container, Content } from "native-base";

//Components
import MenuItem from "../Menu/Menu";

//Styles
import styles from "./style";
class Finder extends Component {
  static navigationOptions = {
    headerTitle: "Find all Around Me!"
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <MenuItem navigation={navigation}/>
        </Content>
      </Container>
    );
  }
}

export default Finder;
