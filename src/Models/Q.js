class Q {
  constructor() {
    this.q = [];
    this.isFinite = false;
  }
  addq = (key, value) => {
    this.q.push({ key: key, value: value });
  };

  reset = () => {
    this.q = [];
    this.isFinite = false;
  };
}
export default Q;
