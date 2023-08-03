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
    this.#initTime = [0, 0]; // 타이머 초기 시간 시퀸스
    this.#initTimeIndex = 0; // 현재 진행 시퀸스 인덱스
    this.#targetTime = 0; // 목표 시각 (내부적으로만 사용, 외부에서 사용할 일 없음)
    this.#remainTime = this.#initTime[0]; // 현재 남은 시간
    this.#isRunning = false; // 현재 타이머 동작 여부
    this.#curIter = 0; // 현재 반복 횟수, current iteration
    this.#maxIter = 1; // 총 반복 횟수 (0: 무한번), maximum iteration

    // state setter
    this.setRemainTime = null; // 남은 시간 state setter
    this.setIsRunning = null; // 동작 여부 state setter
    this.setProgress = null; // progress state setter
    console.log("basic timer constructor");
  }

  // 현재 타이머 시간이 0 이 되었을 때, 다음 동작을 결정하는 함수 (내부적으로만 사용, 외부에서 사용할 일 없음)
  #determineKillCounter() {
    // 아직 시간 시퀸스를 다 못 마친 경우
    if (this.#initTimeIndex + 1 < this.#initTime.length) {
      this.#remainTime = this.#initTime[++this.#initTimeIndex];
      this.#targetTime = new Date().getTime() + this.#remainTime;
      return;
    }
    // 반복 횟수가 남아 있는 경우
    if (this.#maxIter === 0 || this.#curIter + 1 < this.#maxIter) {
      this.#remainTime = this.#initTime[(this.#initTimeIndex = 0)];
      if (this.#maxIter > 0) this.#curIter++;
      this.#targetTime = new Date().getTime() + this.#remainTime;
      return;
    }
    // 다 끝난 경우
    clearInterval(this.#counter);
    this.#isRunning = false;
    this.#remainTime = 0;
  }

  // 타이머 카운터 시작시키는 함수
  #startCounter() {
    this.#counter = setInterval(() => {
      const now = new Date().getTime();
      this.#remainTime = this.#targetTime - now;
      if (this.#remainTime <= 0) this.#determineKillCounter();

      // state setter
      if (this.setRemainTime != null) this.setRemainTime(this.#remainTime);
      if (this.setProgress != null) this.setProgress(this.getProgress());
      if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    }, 0);
  }

  // 타이머 시작하는 함수
  start() {
    if (this.#isRunning) return; // 이미 동작 중이면 리턴
    this.#isRunning = true;
    this.#targetTime = new Date().getTime() + this.#remainTime; // 목표 시각 설정
    this.#startCounter(); // 이벤트 루프 시작

    // state setter
    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    console.log(`start: ${this.#remainTime}`);
  }

  // 타이머 일시 정지하는 함수
  pause() {
    clearInterval(this.#counter); // 이벤트 루프 정지
    this.#isRunning = false;

    // state setter
    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    console.log(`pause: ${this.#remainTime}`);
  }

  // 타이머를 초기화하는 함수
  // initTime list에 0:공부 1:휴식으로 나누어 입력
  reset(initTime, study, maxIter) {
    clearInterval(this.#counter);
    if (initTime != null) this.#initTime[study] = initTime;
    if (maxIter != null) this.#maxIter = maxIter;
    this.#isRunning = false;
    this.#remainTime = this.#initTime[0];
    this.#curIter = 0;
    this.#initTimeIndex = 0;

    // state setter
    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    if (this.setRemainTime != null) this.setRemainTime(this.#remainTime);
    if (this.setProgress != null) this.setProgress(this.getProgress());
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

    if (this.#isRunning === true) this.start();

    // state setter
    if (this.setRemainTime != null) this.setRemainTime(this.#remainTime);
    if (this.setIsRunning != null) this.setIsRunning(this.#isRunning);
    if (this.setProgress != null) this.setProgress(this.getProgress());
  }

  save() {
    return {
      initTime: this.#initTime,
      initTimeIndex: this.#initTimeIndex,
      remainTime: this.#remainTime,
      isRunning: this.#isRunning,
      curIter: this.#curIter,
      maxIter: this.#maxIter,
    };
  }

  // getter
  getIsRunning() {
    return this.#isRunning;
  }
  getRemainTime() {
    return this.#remainTime;
  }
  getProgress() {
    return 1 - this.#remainTime / this.#initTime[this.#initTimeIndex];
  }
  // #counter 변수에 접근할 수 있는 public 메서드
  getCounter() {
    return this.#counter;
  }
  // #targetTime 변수에 접근할 수 있는 public 메서드
  getTargetTime() {
    return this.#targetTime;
  }
  // #initTime 변수에 접근할 수 있는 public 메서드
  getInitTime() {
    return this.#initTime;
  }
  // #initTimeIndex 변수에 접근할 수 있는 public 메서드
  getInitTimeIndex() {
    return this.#initTimeIndex;
  }
  // #maxIter 변수에 접근할 수 있는 public 메서드
  getMaxIter() {
    return this.#maxIter;
  }
  // #curIter 변수에 접근할 수 있는 public 메서드
  getCurIter() {
    return this.#curIter;
  }

}
