import Board from '../../src/js/board'
import Column from '../../src/js/column'
import expect from 'expect'

describe('Board', () => {
  describe('Construction', () => {
    it('should construct a board with the appropriate number columns', () => {
      const board = new Board(3, 4)
      expect(board.columns[0]).toEqual(new Column(4))
      expect(board.columns[1]).toEqual(new Column(4))
      expect(board.columns[2]).toEqual(new Column(4))
      expect(board.isValidBoard).toBe(true)
    })
    it('should handle invalid constructor arguments', () => {
      const board = new Board('test', '5')
      expect(board.isValidBoard).toBe(false)
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
      expect(board.columns[0]).toEqual(columnA)
      expect(board.columns[1]).toEqual(columnB)
    })
    it('should handle invalid arguments', () => {
      expect(board.addChecker(1, 3)).toBe(false)
      expect(board.addChecker(1, 'test')).toBe(false)
    })
    it('should detect when the board is full', () => {
      expect(board.isFull()).toBe(false)
      board.addChecker(4, 2)
      columnB.addChecker(4)
      expect(board.isFull()).toBe(true)
    })
    it('should not add more any checkers once the board is full', () => {
      expect(board.addChecker(5, 1)).toBe(false)
      expect(board.columns[0]).toEqual(columnA)
      expect(board.columns[1]).toEqual(columnB)
    })
  })
  describe('Checking Winning Conditions', () => {
    it('should detect whether winning is possible', () => {
      let boardA = new Board(7, 6)
      expect(boardA.isWinningPossible).toBe(true)
      let boardB = new Board(3, 3)
      expect(boardB.isWinningPossible).toBe(false)
    })
    it('should detect whether a diagonal win is possible', () => {
      let boardA = new Board(7, 6)
      expect(boardA.isDiagonalWinPossible).toBe(true)
      let boardB = new Board(7, 2)
      expect(boardB.isDiagonalWinPossible).toBe(false)
      expect(boardB.isWinningPossible).toBe(true)
    })
    it('should detect horizontal winning conditions', () => {
      let board = new Board(7, 6)
      board.addChecker(1, 1)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 7)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 2)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 3)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 6)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 5)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 4)
      expect(board.isWon).toBe(true)
    })
    it('should detect vertical winning conditions', () => {
      let board = new Board(7, 6)
      board.addChecker(1, 3)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 3)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 3)
      expect(board.isWon).toBe(false)
      board.addChecker(1, 3)
      expect(board.isWon).toBe(true)
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
      expect(boardA.isWon).toBe(true)
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
      expect(boardB.isWon).toBe(true)
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
      expect(boardC.isWon).toBe(true)
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
      expect(boardD.isWon).toBe(false)
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
      expect(boardA.isWon).toBe(true)
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
      expect(boardA.isWon).toBe(true)
      boardA.reset()
      expect(boardA.isWon).toBe(false)
    })
  })
})