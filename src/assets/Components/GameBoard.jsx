import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import winImage from "./win.gif"

const shuffleArray = (arr) => {
  let shuffledArr = arr.slice();
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[randomIndex]] = [
      shuffledArr[randomIndex],
      shuffledArr[i],
    ];
  }
  return shuffledArr;
};
let timing;


function GameBoard() {
    let minute = 5;
  let second = 0
  const cardArr = [
    "1",

    "2",

    "3",

    "4",

    "5",

    "6",

    "7",

    "8",

    "9",

    "10",

    "1",

    "2",

    "3",

    "4",

    "5",

    "6",

    "7",

    "8",

    "9",

    "10",
  ];
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));
  const [selected, setSelected] = useState([]);
  const [min, setMin] = useState(minute);
  const [sec, setSec] = useState(second);
  const [game, setGame] = useState(false);
  const [win,setWin] = useState(false)


  const handleClick = (index) => {
    if (selected.length === 2 || flipped[index]) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    const newSelected = [...selected, { index, value: cards[index] }];
    setSelected(newSelected);
    if (newSelected.length === 2) {
      setTimeout(() => {
        if (newSelected[0].value === newSelected[1].value) {
          if(score===9){
            setScore(score+1)
            showWin();
          }
          setScore(score + 1);
        } else {
          newFlipped[newSelected[0].index] = false;
          newFlipped[newSelected[1].index] = false;
          setFlipped([...newFlipped]);
        }

        setSelected([]);
      }, 1000);
    }
    
  };

  const reset = () => {
    clearInterval(timing);
    setMin(minute);
    setSec(second);
    setFlipped(Array(cards.length).fill(false));
    setCards(shuffleArray(cardArr));
    gameStart();
    setWin(false)
    setGame(true);
    setScore(0);
  };

  const start = () => {
    if (game) return;
    setGame(true);
    setMin(minute);
    setSec(second);
    setWin(false)
    gameStart();
  };
  useEffect(()=>{
console.log(min,"min")
  },[min])

  const gameStart = (start = true) => {
    if (start) {
      let m = min;
      let s = sec;
      setCards(shuffleArray(cardArr));
      timing = setInterval(() => {

        if (s === 0 && m >= 0) {
          if (m == 0 && s === 0) {
            gameStop();
            return;
          }
          setMin(m - 1);

          m = m - 1;
          s = 59;
          setSec(s)
        } else {
          s = s - 1;
          setSec(s)
        }

       
       
      }, 1000);
    }
  };

  const gameStop = () => {
    clearInterval(timing);
    setMin(minute);
    setSec(second);
    setGame(false);
    setCards([]);
 
  };

  const showWin = ()=>{
setWin(true)
clearInterval(timing);
setMin(minute);
setSec(second);
setGame(false);
setCards([]);

  }

  return (
<>
<div className="p-2 flex justify-center gap-10 ">
        <button
          onClick={reset}
          className="border-2 border-black px-4  rounded-3xl bg-[#fffec8] hover:bg-[#fdd5d5]"
        >
          Reset
        </button>
        <p className="font-bold text-lg px-4 py-1">score: {score}</p>
        <p className=" text-lg px-4 py-1">
          {sec<10 ? `0${min}:0${sec}` : `0${min}:${sec}`}
        </p>
        <button
          onClick={start}
          className="border-2 border-black px-4 rounded-3xl bg-[#fffec8] hover:bg-[#fdd5d5]"
        >
          Start
        </button>
      </div>

      <div>

      {  win && <div className="flex justify-center">
<img src={winImage} alt="" />
        </div>}
      </div>
      

      <div className="grid grid-cols-5 gap-5 p-4">
        {cards?.map((item, index) => {
          return (
            <Cards
              text={item}
              key={index}
              onClick={() => handleClick(index)}
              flipped={flipped[index]}
            />
          );
        })}
      </div>
</>
  )
}

export default GameBoard