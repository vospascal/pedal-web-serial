import styled from "@emotion/styled";
import {
  alignItems,
  alignSelf,
  color,
  display,
  flex,
  flexBasis,
  fontSize,
  justifyContent,
  order,
  space,
  textAlign,
  width,
} from "styled-system";

export const Box = styled("div")(
  {
    boxSizing: "border-box",
  },
  width,
  space,
  flex,
  fontSize,
  color,
  order,
  textAlign,
  alignItems,
  justifyContent,
  alignSelf,
  flexBasis,
  display,
  (props) => props.css
);
Box.displayName = "Box";
