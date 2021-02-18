import { INavLinkGroup, Nav, Separator } from "@fluentui/react";
import { NeutralColors } from "@fluentui/theme";
import React, { Fragment } from "react";

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      { name: "Home", url: "/" },
      { name: "To-Do", url: "/todo" },
    ],
  },
];

const separatorStyle = {
  content: { backgroundColor: NeutralColors.gray10 },
  root: {
    selectors: {
      "::before": { backgroundColor: NeutralColors.gray70 },
    },
  },
};

export default function Navigation() {
  return (
    <Fragment>
      <Separator styles={separatorStyle}></Separator>
      <Nav groups={navLinkGroups} />
    </Fragment>
  );
}
