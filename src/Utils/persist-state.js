//saving the state to local storage

export const persistState = (storageKey, state) => {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
};

//retreiving local storage
export const getIntialState = (storageKey) => {
  const savedState = window.localStorage.getItem(storageKey);
  try {
    if (!savedState) {
      return undefined;
    }
    return JSON.parse(savedState);
  } catch (e) {
    console.error("Error loading state :" + storageKey);
    return undefined;
  }
};
//https://medium.com/@OllyD/persistent-state-using-react-hooks-context-no-redux-17cf39da8814