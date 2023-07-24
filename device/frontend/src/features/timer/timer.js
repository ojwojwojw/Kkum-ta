import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
// import { create } from "./timerSlice";  // 모듈이 없다고 에러가 뜸
// import { selectTimer } from "./timerSlice"; // 모듈이없다고 에러가 뜸


// export function CreateTimer() {
//   const timerArray = useSelector(createTimer);
//   const dispatch = useDispatch();
//   const [createTimer, setCreateTimer] = useState([]);

//   return(
//     <div>
//       <button onClick={()=> dispatch(create())}>
//         CreateTimer
//       </button>
//     </div>
//   )
// }