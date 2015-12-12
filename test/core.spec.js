import Game, { Board, Column } from '../src/core'
import { GAME_STATE_ACTIVE, GAME_STATE_WON } from '../src/core'
import { expect } from 'chai'

describe('Core', () => {
  describe('Column', () => {
    describe('Construction', () => {
      it('should create a column of the appropriate size', () => {
        let column = new Column(5)
        expect(column.rows.length).to.equal(5)
        column = new Column(25)
        expect(column.rows.length).to.equal(25)
      })
      it('should handle strings invalid input data', () => {
        let columnA = new Column('dog')
        expect(columnA.rows.length).to.equal(0)

        let columnB = new Column(-5)
        expect(columnB.rows.length).to.equal(0)

        let columnC = new Column(0.008)
        expect(columnC.rows.length).to.equal(0)
      })
    })
    describe('Adding Checker', () => {
      let column = new Column(3)
      it('should add a checker to the bottom row', () => {
        column.addChecker(1)
        expect(column.rows).to.deep.equal([1, 0, 0])
        expect(column.availableRows).to.equal(2)
        column.addChecker(2)
        expect(column.rows).to.deep.equal([1, 2, 0])
        expect(column.availableRows).to.equal(1)
      })
      it('should handle invalid input data', () => {
        column.addChecker('A')
        column.addChecker(0.208)
        column.addChecker(-1)
        expect(column.rows).to.deep.equal([1, 2, 0])
      })
      it('should not let you add more checkers once all rows are filled', () => {
        column.addChecker(3)
        expect(column.addChecker(4)).to.equal(false)
        expect(column.rows).to.deep.equal([1, 2, 3])
        expect(column.availableRows).to.equal(0)
      })
    })
    describe('Reset', () => {
      let column = new Column(5)
      column.addChecker(1)
      column.addChecker(1)
      column.addChecker(2)
      column.addChecker(1)
      it('should clear all checkers from the row', () => {
        column.reset()
        expect(column.rows).to.deep.equal([0, 0, 0, 0, 0])
        expect(column.availableRows).to.equal(5)
      })
    })
  })
  describe('Board', () => {
    describe('Construction', () => {
      it('should construct a board with the appropriate number columns', () => {
        const board = new Board(3, 4)
        expect(board.columns[0]).to.deep.equal(new Column(4))
        expect(board.columns[1]).to.deep.equal(new Column(4))
        expect(board.columns[2]).to.deep.equal(new Column(4))
        expect(board.isValidBoard).to.equal(true)
      })
      it('should handle invalid constructor arguments', () => {
        const board = new Board('test', '5')
        expect(board.isValidBoard).to.equal(false)
      })
    })
    describe('Adding Checker', () => {
      let board = new Board(2, 2)
      let columnA = new Column(2)
      let columnB = new Column(2)
      it('should properly add checkers to columns', () => {
        board.addChecker(1, 1)
        board.addChecker(2, 2)
        board.addChecker(3, 1)
        columnA.addChecker(1)
        columnA.addChecker(3)
        columnB.addChecker(2)
        expect(board.columns[0]).to.deep.equal(columnA)
        expect(board.columns[1]).to.deep.equal(columnB)
      })
      it('should handle invalid arguments', () => {
        expect(board.addChecker(1, 3)).to.equal(false)
        expect(board.addChecker(1, 'test')).to.equal(false)
      })
      it('should detect when the board is full', () => {
        expect(board.isFull()).to.equal(false)
        board.addChecker(4, 2)
        columnB.addChecker(4)
        expect(board.isFull()).to.equal(true)
      })
      it('should not add more any checkers once the board is full', () => {
        expect(board.addChecker(5, 1)).to.equal(false)
        expect(board.columns[0]).to.deep.equal(columnA)
        expect(board.columns[1]).to.deep.equal(columnB)
      })
    })
    describe('Checking Winning Conditions', () => {
      it('should detect whether winning is possible', () => {
        let boardA = new Board(7, 6)
        expect(boardA.isWinningPossible).to.equal(true)
        let boardB = new Board(3, 3)
        expect(boardB.isWinningPossible).to.equal(false)
      })
      it('should detect whether a diagonal win is possible', () => {
        let boardA = new Board(7, 6)
        expect(boardA.isDiagonalWinPossible).to.equal(true)
        let boardB = new Board(7, 2)
        expect(boardB.isDiagonalWinPossible).to.equal(false)
        expect(boardB.isWinningPossible).to.equal(true)
      })
      it('should detect horizontal winning conditions', () => {
        let board = new Board(7, 6)
        board.addChecker(1, 1)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 7)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 2)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 6)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 5)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 4)
        expect(board.isWon).to.equal(true)
      })
      it('should detect vertical winning conditions', () => {
        let board = new Board(7, 6)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(true)
      })
      it('should detect diagonal up winning conditions', () => {
        let boardA = new Board(7, 6)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 2)
        boardA.addChecker(2, 3)
        boardA.addChecker(2, 3)
        boardA.addChecker(1, 3)
        boardA.addChecker(2, 4)
        boardA.addChecker(2, 4)
        boardA.addChecker(2, 4)
        boardA.addChecker(1, 4)
        expect(boardA.isWon).to.equal(true)
        let boardB = new Board(7, 6)
        boardB.addChecker(2, 2)
        boardB.addChecker(1, 2)
        boardB.addChecker(2, 3)
        boardB.addChecker(2, 3)
        boardB.addChecker(1, 3)
        boardB.addChecker(2, 4)
        boardB.addChecker(2, 4)
        boardB.addChecker(2, 4)
        boardB.addChecker(1, 4)
        boardB.addChecker(1, 1)
        expect(boardB.isWon).to.equal(true)
        let boardC = new Board(7, 6)
        boardC.addChecker(2, 2)
        boardC.addChecker(1, 2)
        boardC.addChecker(2, 3)
        boardC.addChecker(2, 3)
        boardC.addChecker(2, 4)
        boardC.addChecker(2, 4)
        boardC.addChecker(2, 4)
        boardC.addChecker(1, 4)
        boardC.addChecker(1, 1)
        boardC.addChecker(1, 3)
        expect(boardC.isWon).to.equal(true)
        let boardD = new Board(7, 6, 5)
        boardD.addChecker(1, 1)
        boardD.addChecker(2, 2)
        boardD.addChecker(1, 2)
        boardD.addChecker(2, 3)
        boardD.addChecker(2, 3)
        boardD.addChecker(1, 3)
        boardD.addChecker(2, 4)
        boardD.addChecker(2, 4)
        boardD.addChecker(2, 4)
        boardD.addChecker(1, 4)
        expect(boardD.isWon).to.equal(false)
      })
      it('should detect diagonal down winning conditions', () => {
        let boardA = new Board(7, 6)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 1)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 2)
        boardA.addChecker(2, 3)
        boardA.addChecker(1, 3)
        boardA.addChecker(2, 5)
        boardA.addChecker(1, 4)
        expect(boardA.isWon).to.equal(true)
      })
    })
    describe('Resetting the Board', () => {
      it('should reset the board', () => {
        let boardA = new Board(7, 6)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 1)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 2)
        boardA.addChecker(2, 3)
        boardA.addChecker(1, 3)
        boardA.addChecker(2, 5)
        boardA.addChecker(1, 4)
        expect(boardA.isWon).to.equal(true)
        boardA.reset()
        expect(boardA.isWon).to.equal(false)
      })
    })
  })
  describe('Game', () => {
    let game = new Game()
    describe('Construction', () => {
      it('should construct a game with the default settings', () => {
        expect(game.board).to.deep.equal(new Board(7, 6))
        expect(game.players).to.deep.equal([
          {playerId: 1, name: 'Player 1', wins: 0},
          {playerId: 2, name: 'Player 2', wins: 0}
        ])
        expect(game.totalPlayers).to.equal(2)
        expect(game.currentPlayer).to.equal(1)
      })
    })
    describe('Game Play', () => {
      it('should be active', () => {
        expect(game.gameState).to.equal(GAME_STATE_ACTIVE)
      })
      it('should allow me to place a checker in the first column', () => {
        game.addChecker(1)
        expect(game.currentPlayer).to.equal(2)
        game.addChecker(2)
        expect(game.currentPlayer).to.equal(1)
        game.addChecker(2)
        game.addChecker(3)
        game.addChecker(4)
        game.addChecker(7)
        game.addChecker(8)
        expect(game.currentPlayer).to.equal(1)
        game.addChecker(7)
        game.addChecker(4)
        game.addChecker(5)
        game.addChecker(6)
        game.addChecker(6)
        game.addChecker(5)
        game.addChecker(4)
        game.addChecker(5)
        game.addChecker(3)
        game.addChecker(3)
        game.addChecker(5)
        game.addChecker(6)
        game.addChecker(6)
        game.addChecker(7)
        game.addChecker(6)
        expect(game.gameState).to.equal(GAME_STATE_WON)
        expect(game.winner).to.deep.equal({
          playerId: 1,
          name: 'Player 1',
          wins: 1
        })
      })
    })
  })
})
