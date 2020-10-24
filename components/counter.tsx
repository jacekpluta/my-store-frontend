import React from "react";
import {
  ButtonCounterFirst,
  ButtonCounterNumber,
  ButtonCounterSecond,
} from "./styles/ButtonStyles";
import { CounterStyles } from "./styles/SingleItemStyle";

interface ICounter {
  addCounter?: Function;
  substractCounter?: Function;
  counter?: Number;
}
const Counter = ({ addCounter, substractCounter, counter }: ICounter) => {
  return (
    <CounterStyles>
      <ButtonCounterFirst
        onClick={() => {
          if (counter < 9) {
            addCounter(counter);
          }
        }}
      >
        +
      </ButtonCounterFirst>
      <ButtonCounterNumber>{counter}</ButtonCounterNumber>
      <ButtonCounterSecond
        onClick={() => {
          if (counter > 1) {
            substractCounter(counter);
          }
        }}
      >
        -
      </ButtonCounterSecond>
    </CounterStyles>
  );
};
export default Counter;
