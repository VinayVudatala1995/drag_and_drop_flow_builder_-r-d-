
import {  createSlice, current } from "@reduxjs/toolkit";
import { VariableInterface } from "../main/mainSlice";

import { RootState } from "../store";

export enum ActionTypes {
    NONE, CREATE, EDIT
}

export interface MainState {
    url :string,
    requestType? : UrlOption,
    params : ParamInterface[],
    paramActionType : ActionTypes,
    paramactionData : ParamInterface,
    headerActionType : ActionTypes,
    headerActionData : HeaderInterface,
    headers : HeaderInterface[],
    response : any,
    responseKeys : ResponseKeyInterface[],
    varibaleAssigned : VariableInterface,
    body : any
}

export interface UrlOption {
    readonly value: string;
    readonly label: string;
  }

  export interface ParamInterface {
    readonly value: string;
    readonly param: string;
    readonly id: string;
  }

  export interface HeaderInterface {
    readonly value: string;
    readonly key: string;
    readonly id: string;
  }

  export interface ResponseKeyInterface {
    readonly value: string;
    readonly label: string;
  }
  const initialState  : MainState = {
    url : '',
    requestType : null,
    params : [],
    paramActionType : ActionTypes.NONE,
    paramactionData : null,
    headerActionType : ActionTypes.NONE,
    headerActionData : null,
    headers : [],
    response : null,
    responseKeys : [],
    varibaleAssigned : null,
    body : null
}


const webhookSlice =  createSlice({
    name : 'webhookSlice',
    initialState,
    reducers : {
      setParamActionType: (state,{payload}) => {
        state.paramActionType = payload;
        state.paramactionData = null;
      },
      setRequestUrl  : (state,{payload}) => {
        state.url =payload;
      },
      setRequestType : (state,{payload}) => {
        state.requestType = payload
      },
      addParam : (state,{payload}) => {
        state.params.push(payload);
        state.paramActionType = ActionTypes.NONE;
      },
      setParamActionData : (state,{payload}) => {
        state.paramactionData = payload;
        state.paramActionType = ActionTypes.EDIT
      },
      updateParam : (state,{payload}) => {
        const ind = state.params.findIndex((e) => e.id == payload.id);
        state.params.splice(ind,1,payload);
        state.paramactionData = null;
        state.paramActionType = ActionTypes.NONE;
      },
      deleteParam : (state,{payload}) => {
        const ind = state.params.findIndex((e) => e.id == payload.id);
        state.params.splice(ind,1);
      },
      setHeaderActionType : (state,{payload}) => {
        state.headerActionType  = payload;
      },
      setHeaderActionData : (state,{payload}) => {
          state.headerActionData = payload;
          state.headerActionType = ActionTypes.EDIT;
      },
      addHeader : (state,{payload }) => {
        state.headers.push(payload);
        console.log(current(state.headers));
      },
      updateHeader : (state,{payload}) => {
        const ind = state.params.findIndex((e) => e.id == payload.id);
        state.headers.splice(ind,1,payload);
        state.headerActionData = null;
        state.headerActionType = ActionTypes.NONE;
      },
      deleteHeader : (state,{payload}) => {
        const ind = state.params.findIndex((e) => e.id == payload.id);
        state.headers.splice(ind,1);
      },
      setResponse : (state,{payload}) => {
        state.response = payload;
        const arr = Object.keys(state.response);
        state.responseKeys = arr.map((e) => {
         
          const newObj : ResponseKeyInterface = {
            value : e,
            label : e
          }

          return newObj;
        })
      },
      setVariable : (state,{payload}) => {
        state.varibaleAssigned = payload;
      },
      resetWebHookSlice : (state) => {
        state.url = '';
        state.requestType = null;
        state.params = [];
        state.paramActionType = ActionTypes.NONE;
        state.paramactionData = null;
        // state.headerActionType = ActionTypes.NONE,
        state.headerActionData = null;
        state.headers = [];
        state.response = null;
        state.responseKeys = [];
        state.varibaleAssigned = null;
        state.headerActionType = ActionTypes.NONE
      },
      setWebHookData : (state,{payload}) => {
        state.url = payload.url;
        state.requestType = payload.requestType;
        state.params = payload.params;     state.headers =payload.headers;
        state.varibaleAssigned = payload.variable;
        state.response = payload.response;
        const arr = Object.keys(state.response);
        state.responseKeys = arr.map((e) => {         
          const newObj : ResponseKeyInterface = {
            value : e,
            label : e
          }
          return newObj;
        })
        
      },
      setBody :  (state,{payload}) => {
        state.body = payload;
      }
     },
     
}

)


export const {setRequestUrl,setRequestType,setBody,addParam,setParamActionType,setWebHookData,resetWebHookSlice,setHeaderActionData,setVariable,setParamActionData,setResponse,setHeaderActionType,updateParam,deleteParam,addHeader,updateHeader,deleteHeader} = webhookSlice.actions;
export default webhookSlice.reducer;