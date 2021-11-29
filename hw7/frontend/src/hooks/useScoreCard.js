import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  addMessages: [],
  queryMessages: [],
  tabState: '',
  setTab: () => {},
  addAddMessage: () => {},
  addQueryMessage: () => {},
  addQueryErrorMessage: () => {},
  clearMessage: () => {},
  addAddErrorMessageL: () => {},
  addTable: [],
  setAddTable: () => {},
  queryTable: [],
  setQueryTable: () => {}
});

const makeMessage = (message, color) => {
  return { message, color };
};
const makeTable = (message) => {
  let data = message.trim().split(',')
  let [name, subject, score] = [data[0].split('(')[1], data[1], data[2].split(')')[0]]
  return {id:0, name:name, subject:subject, score:score}
}

const ScoreCardProvider = (props) => {
  // const [messages, setMessages] = useState([]);
  // const addCardMessage = (message) => {
  //   setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  // };

  // const addRegularMessage = (...ms) => {
  //   setMessages([
  //     ...messages,
  //     ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
  //   ]);
  // };
  // const addErrorMessage = (message) => {
  //   setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  // };
  // const clearMessage = (message) =>{
  //   setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)])
  // }
  const [addMessages, setAddMessages] = useState([]);
  const [queryMessages, setQueryMessages] = useState([]);
  const [tabState, setTabState] = useState('add')
  const [addTable, setAddTable] = useState([])
  const [queryTable, setQueryTable] = useState([])
  const setTab = (value) =>{
    setTabState(value)
  }
  const addAddMessage = (message) => {
    setAddMessages([...addMessages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const updateAddTable = (...ms) =>{
    setAddTable([
        ...ms.map((m) => makeTable(m)
    )])
  }

  const addQueryMessage = (...ms) => {
    setQueryMessages([
      ...queryMessages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);

    setQueryTable([...ms.map((m) => makeTable(m))])

  };
  const addAddErrorMessage = (message) => {
    setAddMessages([...addMessages,makeMessage(message, ERROR_MESSAGE_COLOR)])
  }

  const addQueryErrorMessage = (message) => {
    // not found: clear up table
    setQueryMessages([...queryMessages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
    setQueryTable([])
  };
  const clearMessage = (message) =>{
    setQueryMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)])
    setAddMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)])
    setAddTable([])
    setQueryTable([])
  }

  return (
    <ScoreCardContext.Provider
      value={{
        addMessages,
        queryMessages,
        addAddMessage,
        addQueryMessage,
        addAddErrorMessage,
        addQueryErrorMessage,
        clearMessage,
        tabState,
        setTab,
        addTable,
        queryTable,
        updateAddTable
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
