import TimerManager from "./timer_manager.js";

const tm = new TimerManager();
const t1 = tm.createBaiscTimer("t1");
const t2 = tm.createBaiscTimer("t2");

t1.reset(3 * 1000).start();
t2.reset(5 * 1000).start();
setTimeout(() => t1.pause(), 1000);
setTimeout(() => t1.start(), 5000);

tm.remove(t1);
tm.remove(t2);