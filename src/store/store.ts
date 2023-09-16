// store.js
import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './main/mainSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "@redux-saga/core";
import NodeOptionsSlice from './nodeOptions/nodeOptionsSlice';
import variables from './variables/variables';
import canvasstr from './canvasstr/canvasstr';
import rootSaga from './saga/saga';
import webhook from './webhook/webhook';
import buttonSlice from './button/buttonSlice';


// let sagaMiddleWare = createSagaMiddleware();
// const middleware =[...getDefaultMiddleware ({thunk : false}),sagaMiddleWare];

export const store = configureStore({
  reducer: {
    nodeOptions : NodeOptionsSlice,
    mainSlice : mainSlice,
    variableSlice : variables,
    canvasStrSlice : canvasstr,
    webhookSlice : webhook,
    buttonSlice : buttonSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({

    serializableCheck : false

  }),
  
  // other options e.g middleware, go here
});


// sagaMiddleWare.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;