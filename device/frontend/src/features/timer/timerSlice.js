import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";

const initialState = {
    time : 0 , 
    isRunning : false ,
}

export const timerSlice = createSlice({
    name : 'timer',
    initialState,

    reducers: {
        start : (state) => {
                
        },
        pause : (state) => {

        },
        reset : (state) => {
            
        }
    }

})
