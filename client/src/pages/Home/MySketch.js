import React, { useState } from "react";
import Sketch from "react-p5";

export default function MySketch() {
  const [x, setx] = useState(50);
  const [y, sety] = useState(50);
  const [men, setMen] = useState([]);

  const left = () => {
    setx(x - 1);
  };
  const goLeft = () => {
    let num = 0;
    while (num < 50) {
      setTimeout(function() {
        console.log(num);
        num++;
      }, 3000);
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.frameRate(30);
  };
  const draw = p5 => {
    p5.background(50, 45, 230, 50);
    p5.ellipse(x, y, 10, 10);
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    // x++;
    // men.forEach(man => {
    //   p5.ellipse(man.xPos, man.yPos, 20, 20);
    // });
    // drawMen(p5);
    drawAll(p5);
  };
  const drawMen = p5 => {
    men.forEach(man => {
      p5.ellipse(man.xPos, man.yPos, 20, 20);
    });
  };
  const drawAll = p5 => {
    drawMen(p5);
  };
  const spawn = p5 => {
    function newXPos() {
      return Math.floor(Math.random() * 250);
    }
    function newYPos() {
      return Math.floor(Math.random() * 250);
    }
    function newMan() {
      let newMan = {
        xPos: newXPos(),
        yPos: newYPos()
      };
      const menTemp = [...men];
      menTemp.push(newMan);
      setMen(menTemp);
    }
    newMan();
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} spawn={spawn} />
      <div>
        <button onClick={() => left()}>left</button>
        <button onClick={() => spawn()}>spawn</button>
        <button onClick={() => goLeft()}>go</button>
      </div>
    </div>
  );
}
