// based on the answer from https://stackoverflow.com/a/57981688
export default class Timer {
    constructor (startTime) {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = startTime;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.isRunning) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    start () {
      if (this.isRunning) {
        return console.error('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    stop () {
      if (!this.isRunning) {
        return console.error('Timer is already stopped');
      }
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
      this.isRunning = false;
    }
  
    reset () {
      this.overallTime = 0;
  
      if (this.isRunning) {
        this.startTime = Date.now();
        return;
      }
  
      this.startTime = 0;
    }
  
    getTime () {
      /*if (!this.startTime) {
        return 0;
      }*/
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
  
      return this.overallTime;
    }
}
