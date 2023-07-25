class DateTimeDto {
  constructor(y, m, d, hh, mm, ss) {
    this.#timestamp = new Date(y, m, d, hh, mm, ss);
    m = m >= 10 ? m : '0' + m;
    d = d >= 10 ? d : '0' + d;
    hh = hh >= 10 ? hh :'0' + hh;
    mm = mm >= 10 ? mm : '0' + mm;
    ss = ss >= 10 ? ss : '0' + ss;
    this.#timeString = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
  get date(){
    return this.#timestamp;
  }
  get timeString() {
    return this.#timeString
  }
  get year() {
    return this.#y;
  }
  get month() {
    return this.#m;
  }
  get date() {
    return this.#d;
  }
  get hour() {
    return this.#hh;
  }
  get minute() {
    return this.#mm;
  }
  get second() {
    return this.#ss;
  }
}
