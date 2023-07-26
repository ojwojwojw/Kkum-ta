import React , {useState} from "react";

const NumberPad = ({parentData,handleChildDataChange}) => {

    const [number, setNumber] = useState('');


    return(
        <div>
            
            <input
                type="text"
                value={number}
                onChange={handleChildDataChange}
                placeholder="자식 컴포넌트의 데이터 입력"
                // style={{ display: "none" }}
            />   
        </div>
    )
}

export default NumberPad