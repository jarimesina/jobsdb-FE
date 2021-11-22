import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';
import { JobSaga } from './jobs';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

function* rootSaga(){
  yield all([
    JobSaga(),
  ]);
}
sagaMiddleware.run(rootSaga);

export default store;


