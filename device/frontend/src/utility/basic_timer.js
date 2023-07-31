export default class BasicTimer {
  #counter;
  #isRunning;
  #targetTime;
  #remainTime;
  #initTime;
  #initTimeIndex;
  #maxIter;
  #curIter;
  constructor() {
    this.#initTime = [1 * 1000, 5 * 1000, 2 * 1000]; // 타이머 초기 시간 시퀸스
    this.#initTimeIndex = 0;                         // 현재 진행 시퀸스 인덱스
    this.#targetTime = 0;                            // 목표 시각 (내부적으로만 사용, 외부에서 사용할 일 없음)
    this.#remainTime = this.#initTime[0];            // 현재 남은 시간
    this.#isRunning = false;                         // 현재 타이머 동작 여부
    this.#curIter = 0;                               // 현재 반복 횟수, current iteration
    this.#maxIter = 2;                               // 총 반복 횟수 (0: 무한번), maximum iteration

    // state setter
    this.setTime = null;                             // 남은 시간 state setter
    this.setIsRunning = null;                        // 동작 여부 state setter
    this.setProgress = null;                         // progress state setter
    console.log("basic timer constructor")
  }

  // 현재 타이머 시간이 0 이 되었을 때, 다음 동작을 결정하는 함수 (내부적으로만 사용, 외부에서 사용할 일 없음)
  #determineNext() {
    // 아직 시간 시퀸스를 다 못 마친 경우
    if (this.#initTimeIndex + 1 < this.#initTime.length) {
      this.#remainTime = this.#initTime[++this.#initTimeIndex];
      this.#targetTime = new Date().getTime() + this.#remainTime;
      return;
    }
    // 반복 횟수가 남아 있는 경우
    if (this.#maxIter == 0 || this.#curIter + 1 < this.#maxIter) {
      this.#remainTime = this.#initTime[0];
      this.#initTimeIndex = 0;
      if (this.#maxIter > 0) this.#curIter++;
      this.#targetTime = new Date().getTime() + this.#remainTime;
      return;
    }
    // 다 끝난 경우
    clearInterval(this.#counter);
    this.#isRunning = false;
    this.#remainTime = 0;

    if (this.setIsRunning != null) this.setIsRunning(false);
  }

  #count() {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#remainTime = this.#targetTime - now;
      if (this.#remainTime <= 0) this.#determineNext();

      // state setter 
      if (this.setTime != null) this.setTime(this.#remainTime);
      if (this.setProgress != null) this.setProgress(1 - this.#remainTime / this.#initTime[this.#initTimeIndex]);
    }, 31);
  }

  // 타이머 시작하는 함수
  start() {
    if (this.#isRunning) return;                                     // 이미 시작 중이면 리턴
    this.#isRunning = true;
    this.#targetTime = new Date().getTime() + this.#remainTime;      // 목표 시각 설정
    this.#count();                                                   // 이벤트 루프 시작

    // state setter 
    if (this.setIsRunning != null) this.setIsRunning(true);
    console.log(`start: ${this.#remainTime}`);
  }

  // 타이머 일시 정지하는 함수
  pause() {
    clearInterval(this.#counter);                                    // 이벤트 루프 정지
    this.#isRunning = false;

    // state setter 
    if (this.setIsRunning != null) this.setIsRunning(false);
    console.log(`pause: ${this.#remainTime}`);
  }

  // 타이머를 초기화하는 함수
  reset(initTime, maxIter) {
    clearInterval(this.#counter);
    if (initTime != null) this.#initTime = initTime;
    if (maxIter != null) this.#maxIter = maxIter;
    this.#isRunning = false;
    this.#remainTime = this.#initTime[0];
    this.#curIter = 0;
    this.#initTimeIndex = 0;

    // state setter 
    if (this.setIsRunning != null) this.setIsRunning(false);
    if (this.setTime != null) this.setTime(this.#remainTime);
    if (this.setProgress != null) this.setProgress(0);
    console.log(`reset: ${this.#remainTime}`);
  }

  load(obj) {
    clearInterval(this.#counter);

    this.#initTime = obj.initTime;
    this.#initTimeIndex = obj.initTimeIndex;
    this.#remainTime = obj.remainTime;
    this.#isRunning = obj.isRunning;
    this.#curIter = obj.curIter;
    this.#maxIter = obj.maxIter;

    // state setter 
    if (this.setTime != null) this.setTime(this.#remainTime);
    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    if (this.setProgress != null) this.setProgress(1 - this.#remainTime / this.#initTime[this.#initTimeIndex]);
  }

  save() {
    return {
      initTime: this.#initTime,
      initTimeIndex: this.#initTimeIndex,
      remainTime: this.#remainTime,
      isRunning: this.#isRunning,
      curIter: this.#curIter,
      maxIter: this.#maxIter,
    }
  }
}