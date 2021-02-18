import { DefaultEffects, IStackProps, Stack } from "@fluentui/react";
import { NeutralColors } from "@fluentui/theme";
import React from "react";

export interface IContainerProps extends IStackProps {
  depth?: number;
}

export const containerStyle = {
  root: {
    margin: 10,
    padding: 10,
    backgroundColor: NeutralColors.gray10,
    boxSizing: "border-box",
  },
};

function elevationForDepth(depth: number | undefined) {
  switch (depth) {
    case 0:
    case undefined:
      return "none";
    case 1:
      return DefaultEffects.elevation4;
    case 2:
      return DefaultEffects.elevation8;
    case 3:
      return DefaultEffects.elevation16;
    case 4:
      return DefaultEffects.elevation64;
    default:
      throw new Error("Illegal Depth");
  }
}

export default function Container(props: IContainerProps) {
  let propRootStyles =
    typeof props.styles === "object" && typeof props.styles.root === "object"
      ? props.styles.root
      : {};

  const styles = {
    root: {
      ...containerStyle.root,
      boxShadow: elevationForDepth(props.depth),
      ...propRootStyles,
    },
  };

  const childProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => key !== "styles")
  );

  return <Stack styles={styles} {...childProps}></Stack>;
}
