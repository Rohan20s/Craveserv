import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { dragEndReducer } from "./reducers/dragEnd";
// import { moveBelowReducer } from "./reducers/moveBelow";


// export interface userData {
//    username: string;
//    name:string;
//    email:string;
// } 

// const status: {
//   credentialData: userData | undefined;
// } = {
//   credentialData: undefined,
// };


const appData : {
    date:number,
    company:string,
    user:any
}={
 date:7,
 company:"Zomato",
 user:{}
}



export const AppData = createSlice({
    name: "appData",
    initialState:appData,
    reducers: {
      updateBill: (state, action: PayloadAction<number>) => {
        state.date = action.payload;
      },
      updateUserData: (state,action: any)=>{
         state.user=action.payload
    }
  }
});
  



export const { updateBill ,updateUserData} =AppData.actions;
