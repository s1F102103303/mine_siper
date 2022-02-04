import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const imageUrl = 'img/minesweeper.png'

const Container = styled.div`
  height: 800px;
  background-color: #549cfb;
`
const Board = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 430px;
  height: 488px;
  margin: 0;
  margin-right: -50%;
  background: yellow;
  background-color: #e3e3e3;
  transform: translate(-50%, -50%);
  border-top: solid 5px #ffffff;
  border-left: solid 5px #ffffff;
  border-right: solid 5px #3e3e3e;
  border-bottom: solid 5px #3e3e3e;
`
const AboveBlock = styled.div`
  position: relative;
  top: 10px;
  width: 378px;
  height: 77px;
  margin: auto;
  background-color: #b0b0b0;
  border-top: solid 5px #3e3e3e;
  border-left: solid 5px #3e3e3e;
  border-right: solid 5px #ffffff;
  border-bottom: solid 5px #ffffff;
`
const NumBombsBlock = styled.div`
  position: absolute;
  top: 8px;
  right: 250px;
  width: 100px;
  height: 50px;
  margin: auto;
  background-color: #1b1b1b;
  color: red;
  font-size: 43px;
  text-align: center;
  border-top: solid 2px #d4d4d4;
  border-left: solid 2px #d4d4d4;
  border-right: solid 2px #3e3e3e;
  border-bottom: solid 2px #3e3e3e;
`
const TimerBlock = styled.div`
  position: absolute;
  top: 8px;
  right: 25px;
  width: 100px;
  height: 50px;
  margin: auto;
  background-color: #1b1b1b;
  color: red;
  font-size: 43px;
  text-align: center;
  border-top: solid 2px #d4d4d4;
  border-left: solid 2px #d4d4d4;
  border-right: solid 2px #3e3e3e;
  border-bottom: solid 2px #3e3e3e;
`

const Face = styled.div`
  position: relative;
  top: 8px;
  width: 50px;
  height: 50px;
  margin: auto;
  background-color: #b0b0b0;
  background-image: url(${imageUrl});
  background-size: 525px;
  background-position: 113px 0px;
  border: solid 5px;
  border-color: #d4d4d4 #3e3e3e #3e3e3e #d4d4d4;
`
const AroundBlockArea = styled.div`
  position: absolute;
  top: 95px;
  right: 20px;
  width: 378px;
  height: 378px;
  margin: auto;
  background-color: #b0b0b0;
  border-top: solid 5px #3e3e3e;
  border-left: solid 5px #3e3e3e;
  border-right: solid 5px #ffffff;
  border-bottom: solid 5px #ffffff;
`
const BlockArea = styled.div`
  position: relative;
  top: 0px;
  width: 369px;
  height: 369px;
  margin: auto;
  background-color: #b0b0b0;
`
const Block = styled.div<{ isOpen: boolean; num: number }>`
  float: left;
  width: 41px;
  height: 41px;
  line-height: 30px;
  vertical-align: baseline;
  background-image: url(${imageUrl});
  background-size: 500px;
  background-position: ${(props) => (props.num - 1) * -36}px 0px;
  background-repeat: no-repeat;
  border-top: ${(props) => (props.isOpen ? 'solid 1px #272424' : 'solid 3px #d4d4d4')};
  border-left: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #d4d4d4')};
  border-right: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #3e3e3e')};
  border-bottom: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #3e3e3e')};
`
const BombBlock = styled.div`
  float: left;
  width: 41px;
  height: 41px;
  line-height: 30px;
  vertical-align: baseline;
  background: #e5e5e5;
  background-image: url(${imageUrl});
  background-size: 515px;
  background-position: -366px 1px;
  background-color: #b0b0b0;
  border: solid 1px #707070;
`
const Home: NextPage = () => {
  // let GameClear = false
  // let GameOver = false

  // prettier -ignore
  const [board, setBoard] = useState([
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ])

  // タイマー関数

  const [count, setCount] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // 爆弾の生成
  const tmpBombs: { x: number; y: number }[] = []
  let NumofBombs = 0
  while (NumofBombs < 10) {
    const numx = Math.floor(Math.random() * 9)
    const numy = Math.floor(Math.random() * 9)

    if (!tmpBombs.some((value) => value === { x: numx, y: numy })) {
      if (!tmpBombs.some((bomb) => bomb.x === numx && bomb.y === numy)) {
        tmpBombs.push({ x: numx, y: numy })
        NumofBombs++
      }
      /*if (!tmpBombs.some((value) => value === { x: numx, y: numy })) {
      tmpBombs.push({ x: numx, y: numy })
      NumofBombs++*/

      // tmpBombs.push({ x: numx, y: numy })
      // i++
    }
  }
  //-----------
  console.log(tmpBombs)
  const [bombs, setBombs] = useState(tmpBombs)

  const onClick = (x: number, y: number) => {
    console.log(x, y)

    // 周りの爆弾を数える関数
    const CountBombs = (x: number, y: number) => {
      let ExistBomb = false
      let NumBombs = 0
      for (let i = 0; i < bombs.length; i++) {
        for (const n of [x + 1, x, x - 1]) {
          for (const j of [y + 1, y, y - 1]) {
            if (n == x && j == y) {
              continue
            }
            if (bombs[i].x === n && bombs[i].y === j) {
              ExistBomb = true
              if (ExistBomb) {
                NumBombs += 1
              }
              ExistBomb = false
            }
          }
        }
      }
      return NumBombs
    }

    // 白連鎖のための周りの座標を保存し返す関数
    const ListofAround = (x: number, y: number) => {
      const CoordinateList = []
      for (const cx of [x + 1, x, x - 1]) {
        for (const cy of [y + 1, y, y - 1]) {
          if (0 <= cx && cx < 9 && 0 <= cy && cy < 9 && { x: x, y: y } !== { x: cx, y: cy }) {
            CoordinateList.push({ x: cx, y: cy })
          }
        }
      }
      return CoordinateList
    }

    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    let existBomb = false
    let NumBombs = 0
    NumBombs = CountBombs(x, y)
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existBomb = true
      }
    }

    /*if (existBomb) {
      GameOver = true
      for (const bomb of tmpBombs) {
        // newBoard[bomb.y][bomb.x] = 10
      }
    }*/

    // 白連鎖
    if (NumBombs === 0) {
      let NewNumBombs = 0
      const Coordinate = ListofAround(x, y)
      for (const c of Coordinate) {
        NewNumBombs = CountBombs(c.x, c.y)
        newBoard[c.y][c.x] = NewNumBombs

        if (NewNumBombs === 0) {
          for (const nc of ListofAround(c.x, c.y))
            if (!Coordinate.some((nb) => nb.x === nc.x && nb.y === nc.y)) {
              Coordinate.push({ x: nc.x, y: nc.y })
            }
        }
      }
    }

    newBoard[y][x] = existBomb ? 10 : NumBombs

    setBoard(newBoard)
  }
  const NewGame = () => {
    setBoard([
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ])
    setBombs(tmpBombs)
    setCount(0)
  }

  return (
    <Container>
      <Board>
        <AboveBlock>
          <NumBombsBlock>0{bombs.length}</NumBombsBlock>
          <Face onClick={() => NewGame()}></Face>
          <TimerBlock>{count}</TimerBlock>
        </AboveBlock>
        <AroundBlockArea>
          <BlockArea>
            {board.map((row, y) =>
              row.map((num, x) =>
                num === 10 ? (
                  <BombBlock key={`${x}-${y}`}></BombBlock>
                ) : (
                  <Block
                    key={`${x}-${y}`}
                    isOpen={num < 9}
                    num={1 <= num && num <= 8 ? num : 20}
                    onClick={() => onClick(x, y)}
                  ></Block>
                )
              )
            )}
          </BlockArea>
        </AroundBlockArea>
      </Board>
    </Container>
  )
}

export default Home