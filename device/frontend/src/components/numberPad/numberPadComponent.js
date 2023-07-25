import React from "react";
import { useDispatch } from "react-redux";
import { insertNumber , deleteNumber } from "../../features/numberpad/numberPadSlice";

const NumberPad = () => {
    const dispatch = useDispatch()
    
    return(
        <div>
            <div>
                <button onClick={()=>{dispatch(insertNumber('1'))}}>1</button>
                <button onClick={()=>{dispatch(insertNumber('2'))}}>2</button>
                <button onClick={()=>{dispatch(insertNumber('3'))}}>3</button>
            </div>
            
            <div>
                <button onClick={()=>{dispatch(insertNumber('4'))}}>4</button>
                <button onClick={()=>{dispatch(insertNumber('5'))}}>5</button>
                <button onClick={()=>{dispatch(insertNumber('6'))}}>6</button>
            </div>
            
            <div>
                <button onClick={()=>{dispatch(insertNumber('7'))}}>7</button>
                <button onClick={()=>{dispatch(insertNumber('8'))}}>8</button>
                <button onClick={()=>{dispatch(insertNumber('9'))}}>9</button>
            </div>
            
            <div>
                <button onClick={()=>{dispatch(deleteNumber('7'))}}>취소</button>
                <button onClick={()=>{dispatch(insertNumber('0'))}}> 0</button>
                <button>입력</button>
            </div>
            
        </div>
    )
}

export default NumberPad