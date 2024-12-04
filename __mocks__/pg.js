const mockQuery = jest.fn();

class Pool {
  constructor() {
    this.query = mockQuery;
    this.on = jest.fn();
  }
}

module.exports = { Pool, mockQuery };