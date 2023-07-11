import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../context&reducer/Reducer";
import { mails } from "../dataFromAPI";
const mailProvider = createContext();

export const MailProviderComponent = ({ children }) => {
  const [content, dispatch] = useReducer(reducer, {
    originalData: mails,
    displayData: mails,
    spam: [],
    bin: [],
    unreadFilter: false,
    isStarredFilter: false,
    inputValue: "",
    currentPage: 1,
    universalSelectorActive: false,
    binSelectorActive: false,
    universalFilterCategoriesSelector: "none"
  });

  const filterHandler = (type) => dispatch({ name: "filter", payload: type });
  const deleteFromInbox = (idPassed) =>
    dispatch({ name: "deleteFromInbox", payload: idPassed });
  const permanentMailDeleter = (idPassed) =>
    dispatch({ name: "deletePermanently", payload: idPassed });
  const mailRecover = (idPassed) =>
    dispatch({ name: "recover", payload: idPassed });
  const mailStarrer = (idPassed) =>
    dispatch({ name: "starMail", payload: idPassed });
  const markAsReadButtonHandler = (idPassed) =>
    dispatch({ name: "markAsRead", payload: idPassed });
  const addToSpam = (idPassed) =>
    dispatch({ name: "addToSpam", payload: idPassed });
  const deleteFromSpam = (idPassed) =>
    dispatch({ name: "deleteFromSpam", payload: idPassed });
  const markAsNotSpam = (idPassed) =>
    dispatch({ name: "markAsNotSpam", payload: idPassed });
  const searchInputHandler = (inputPassed) =>
    dispatch({ name: "searchInputHandler", payload: inputPassed });
  const selectMailHandler = (idPassed) =>
    dispatch({ name: "selectMailHandler", payload: idPassed });
  const universalSelectorToggler = (pageNumber) =>
    dispatch({ name: "universalSelectorToggler", payload: pageNumber });
  const categoryUniversalSelector = (categoryPassed, currentPage) =>
    dispatch({
      name: "categoryUniversalSelector",
      payload: { categoryPassed, currentPage }
    });
  const deleteMultiple = () =>
    dispatch({ name: "deleteMultiple", payload: "" });
  const mailRecoverMultiple = (idsPassed) =>
    dispatch({ name: "mailRecoverMultiple", payload: idsPassed });
  const pageChangeHandler = (pageNumberPassed, numberOfPages) => {
    dispatch({
      name: "pageChangeHandler",
      payload: { pageNumberPassed, numberOfPages }
    });
  };
  const binSelectorToggler = () => dispatch({ name: "binSelectorToggler" });
  const deleteMultipleBin = () => dispatch({ name: "deleteMultipleBin" });

  const currentRenderingData = (() => {
    const { displayData, unreadFilter, isStarredFilter, inputValue } = content;
    // const pageWiseMails = displayData.slice(
    //   content.currentPage * 8 - 8,
    //   content.currentPage * 8
    // );
    let output = [];
    if (!unreadFilter && !isStarredFilter) {
      output = displayData;
    } else if (unreadFilter) {
      output = isStarredFilter
        ? displayData.filter((mail) => mail.unread && mail.isStarred)
        : displayData.filter((mail) => mail.unread);
    } else {
      output = displayData.filter((mail) => mail.isStarred);
    }

    const finalDisplayData =
      inputValue === ""
        ? output
        : output.filter(
            ({ subject, content }) =>
              subject.toLowerCase().includes(inputValue) ||
              content.toLowerCase().includes(inputValue)
          );
    return finalDisplayData;
  })();

  const numberOfPagesCalculator =
    currentRenderingData.length % 8 === 0
      ? currentRenderingData.length / 8
      : Math.trunc(currentRenderingData.length / 8) + 1;

  useEffect(() => {
    const universalSelectorState = content.displayData.some(
      ({ isChecked }) => isChecked
    )
      ? true
      : false;
    dispatch({
      name: "universalSelectorStateChanger",
      payload: universalSelectorState
    });
  }, [content.displayData]);

  return (
    <mailProvider.Provider
      value={{
        content,
        dispatch,
        filterHandler,
        deleteFromInbox,
        currentRenderingData,
        permanentMailDeleter,
        mailRecover,
        mailStarrer,
        markAsReadButtonHandler,
        addToSpam,
        deleteFromSpam,
        markAsNotSpam,
        searchInputHandler,
        selectMailHandler,
        universalSelectorToggler,
        categoryUniversalSelector,
        deleteMultiple,
        mailRecoverMultiple,
        pageChangeHandler,
        numberOfPagesCalculator,
        binSelectorToggler,
        deleteMultipleBin
      }}
    >
      {children}
    </mailProvider.Provider>
  );
};

export const useMailContext = () => useContext(mailProvider);
