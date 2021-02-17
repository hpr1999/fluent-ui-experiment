import Navigation from "./Navigation";
import {
  ActionButton,
  getTheme,
  initializeIcons,
  Panel,
  PanelType,
  Text,
} from "@fluentui/react";
import React, { CSSProperties, Fragment, useState } from "react";
import Todo from "./Todo";
import { NeutralColors } from "@fluentui/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";

initializeIcons();
const theme = getTheme();

function App() {
  const bodyStyle: CSSProperties = {
    minHeight: "100vh",
    backgroundColor: NeutralColors.gray30,
    overflow: "auto",
  };

  const navBarStyle: CSSProperties = {
    minHeight: "5vh",
    lineHeight: "5vh",
    boxSizing: "border-box",
    boxShadow: theme.effects.elevation8,
    backgroundColor: NeutralColors.gray10,
  };

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <div style={bodyStyle}>
        <div style={navBarStyle}>
          <ActionButton
            iconProps={{ iconName: "GlobalNavButton" }}
            onClick={(e) => setOpen(true)}
          />
          <Text variant="large">Fluent-UI Experiment</Text>
          <Panel
            isOpen={open}
            isLightDismiss
            onDismiss={() => setOpen(false)}
            type={PanelType.smallFixedNear}
            headerText="Navigation"
            styles={{ main: { backgroundColor: NeutralColors.gray10 } }}
          >
            <Navigation />
          </Panel>
        </div>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/"></Route>
              <Route exact path="/todo">
                <Todo />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
