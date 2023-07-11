export const reducer = (state, action) => {
  switch (action.name) {
    case "filter": {
      const whatToFilter = `${action.payload}Filter`;
      return { ...state, [whatToFilter]: !state[whatToFilter] };
    }
    case "deleteFromInbox": {
      const mailToDelete = state.displayData.find(
        ({ mId }) => mId === action.payload
      );
      const updatedData = state.displayData.filter(
        ({ mId }) => mId !== action.payload
      );
      return {
        ...state,
        // popUp: true,
        displayData: [...updatedData],
        bin: [...state.bin, { ...mailToDelete }]
      };
    }

    case "deletePermanently": {
      const updatedTrash = state?.bin?.filter(
        (mail) => mail.mId !== action.payload
      );
      return { ...state, bin: [...updatedTrash] };
    }
    case "recover": {
      const mailToRecover = state.bin.find(({ mId }) => mId === action.payload); //A
      const updatedTrashData = state.bin.filter(
        ({ mId }) => mId !== action.payload
      );
      // const nonUseVariable = state?.displayData?.unshift({ ...mailToRecover });
      const temp = [...state.displayData, { ...mailToRecover }];

      // original: A B C
      // COPPY: [A B E , C]

      const findInTemp = (mailToCheck) =>
        temp.find(({ mId }) => mId === mailToCheck.mId);

      const updatedData = state.originalData.filter((mail) => findInTemp(mail));
      return {
        ...state,
        displayData: [...updatedData],
        bin: [...updatedTrashData]
      };
    }
    case "starMail": {
      const updatedData = state?.displayData?.map((mail) =>
        mail.mId === action.payload
          ? { ...mail, isStarred: !mail.isStarred }
          : { ...mail }
      );
      return {
        ...state,
        displayData: [...updatedData],
        originalData: [...updatedData]
      };
    }
    case "markAsRead": {
      const updatedData = state?.displayData?.map((mail) =>
        mail.mId === action.payload
          ? { ...mail, unread: !mail.unread }
          : { ...mail }
      );
      return {
        ...state,
        displayData: [...updatedData],
        originalData: [...updatedData]
      };
    }

    case "addToSpam": {
      const spamMail = state.displayData.find(
        ({ mId }) => mId === action.payload
      );
      const updatedData = state.displayData.filter(
        ({ mId }) => mId !== action.payload
      );
      return {
        ...state,
        displayData: [...updatedData],
        spam: [...state.spam, { ...spamMail }]
      };
    }
    case "deleteFromSpam": {
      const mailToDelete = state.spam.find(({ mId }) => mId === action.payload);
      const Data = state.spam.filter(({ mId }) => mId !== action.payload);
      return {
        ...state,
        spam: [...Data],
        bin: [...state.bin, { ...mailToDelete }]
      };
    }
    case "markAsNotSpam": {
      const mailToRecover = state.spam.find(
        ({ mId }) => mId === action.payload
      );
      const updatedSpamData = state.spam.filter(
        ({ mId }) => mId !== action.payload
      );
      // const nonUseVariable = state?.displayData?.unshift({ ...mailToRecover });
      const temp = [...state.displayData, { ...mailToRecover }];
      const findInTemp = (mailToCheck) =>
        temp.find(({ mId }) => mId === mailToCheck.mId);
      const updatedData = state.originalData.filter((mail) => findInTemp(mail));
      return {
        ...state,
        displayData: [...updatedData],
        spam: [...updatedSpamData]
      };
    }

    case "searchInputHandler": {
      return { ...state, inputValue: action.payload };
    }

    case "selectMailHandler": {
      const updatedData = state.displayData.map((mail) =>
        mail.mId === action.payload
          ? { ...mail, isChecked: !mail.isChecked }
          : mail
      );
      return { ...state, displayData: [...updatedData] };
    }

    //tough tha
    case "universalSelectorToggler": {
      let mailWithIdToCheckMark = [];
      if (state.inputValue === "") {
        for (let i = action.payload * 8 - 8; i < action.payload * 8; i++) {
          mailWithIdToCheckMark.push(state.displayData[i].mId);
        }
      } else {
        mailWithIdToCheckMark = [
          ...state.displayData
            .filter(
              ({ subject, content }) =>
                subject.toLowerCase().includes(state.inputValue) ||
                content.toLowerCase().includes(state.inputValue)
            )
            .map((mail) => mail.mId)
        ];
      }

      for (let i = 0; i < state.displayData.length; i++) {
        state.displayData[i].isChecked =
          mailWithIdToCheckMark.includes(state.displayData[i].mId) &&
          state.universalSelectorActive === false
            ? true
            : false;
      }

      // for (let i = action.payload * 8 - 8; i < action.payload * 8; i++) {
      //   state.displayData[i].isChecked =
      //     state.universalSelectorActive === false ? true : false;
      // }

      // const updatedData =
      //   state.universalSelectorActive === false
      //     ? pageToWorkOn.map((mail) => ({ ...mail, isChecked: true }))
      //     : pageToWorkOn.map((mail) => ({ ...mail, isChecked: false }));

      // this is for all selection
      // const updatedData =
      //   state.universalSelectorActive === false
      //     ? state.displayData.map((mail) => ({ ...mail, isChecked: true }))
      //     : state.displayData.map((mail) => ({ ...mail, isChecked: false }));
      return {
        ...state,
        // displayData: [...updatedData],
        universalSelectorActive: !state.universalSelectorActive
      };
    }
    case "universalSelectorStateChanger": {
      return { ...state, universalSelectorActive: action.payload };
    }

    case "ResetSelectors": {
      const updatedData = state.displayData.map((mail) => ({
        ...mail,
        isChecked: false
      }));
      return {
        ...state,
        universalSelectorActive: false,
        displayData: [...updatedData],
        universalFilterCategoriesSelector: "none"
      };
    }

    case "categoryUniversalSelector": {
      const { categoryPassed, currentPage } = action.payload;

      for (let i = currentPage * 8 - 8; i < currentPage * 8; i++) {
        switch (categoryPassed) {
          case "all": {
            state.displayData[i].isChecked = true;
            break;
          }
          case "unread": {
            state.displayData[i].isChecked =
              state.displayData[i].unread === true ? true : false;
            break;
          }
          case "read": {
            state.displayData[i].isChecked =
              state.displayData[i].unread !== true ? true : false;
            break;
          }
          case "starred": {
            state.displayData[i].isChecked = state.displayData[i].isStarred
              ? true
              : false;
            break;
          }
          default:
            state.displayData[i].isChecked = false;
            break;
        }
      }
      return {
        ...state,
        displayData: [...state.displayData],
        universalFilterCategoriesSelector: categoryPassed
      };
      // switch (action.payload) {
      //   case "All": {
      //     updatedData = state.displayData.map((mail) => ({
      //       ...mail,
      //       isChecked: true
      //     }));
      //     break;
      //   }
      //   case "Unread": {
      //     updatedData = state.displayData.map((mail) =>
      //       mail.unread === true
      //         ? { ...mail, isChecked: true }
      //         : { ...mail, isChecked: false }
      //     );
      //     break;
      //   }
      //   case "Read": {
      //     updatedData = state.displayData.map((mail) =>
      //       mail.unread === false
      //         ? { ...mail, isChecked: true }
      //         : { ...mail, isChecked: false }
      //     );
      //     break;
      //   }
      //   case "Starred": {
      //     updatedData = state.displayData.map((mail) =>
      //       mail.isStarred === true
      //         ? { ...mail, isChecked: true }
      //         : { ...mail, isChecked: false }
      //     );
      //     break;
      //   }
      //   default:
      //     updatedData = state.displayData.map((mail) => ({
      //       ...mail,
      //       isChecked: false
      //     }));
      //     break;
      // }
    }

    case "deleteMultipleBin": {
      const updatedBinData = state.bin.filter(
        ({ isChecked }) => isChecked === false
      );
      return {
        ...state,
        bin: [...updatedBinData],
        binSelectorActive: false
      };
    }

    case "deleteMultiple": {
      const updatedInbox = state.displayData.filter(
        ({ isChecked }) => isChecked === false
      );
      const updatedBinData = state.displayData.filter(
        ({ isChecked }) => isChecked === true
      );

      return {
        ...state,
        displayData: [...updatedInbox],
        bin: [...updatedBinData]
      };
    }

    case "mailRecoverMultiple": {
      const mailsToRecoverIds = action.payload;
      const updatedBin = state.bin.filter(
        ({ mId }) => !mailsToRecoverIds.find((id) => id === mId)
      );
      const temp = [
        ...state.displayData.map(({ mId }) => mId),
        ...mailsToRecoverIds
      ];

      const updatedInbox = state.originalData
        .filter(({ mId }) => temp.find((id) => id === mId))
        .map((mail) => ({ ...mail, isChecked: false }));

      return { ...state, bin: [...updatedBin], displayData: [...updatedInbox] };
    }

    case "pageChangeHandler": {
      const { pageNumberPassed, numberOfPages } = action.payload;
      if (pageNumberPassed === state.currentPage) {
        return { ...state, currentPage: pageNumberPassed };
      }
      const whichPageToJump =
        pageNumberPassed >= 1 &&
        pageNumberPassed <= numberOfPages &&
        pageNumberPassed;
      return { ...state, currentPage: whichPageToJump };
    }

    case "binSelectorToggler": {
      const { bin } = state;
      if (state.binSelectorActive) {
        const updatedBin = bin.map((mail) => ({ ...mail, isChecked: false }));
        return {
          ...state,
          bin: [...updatedBin],
          binSelectorActive: !state.binSelectorActive
        };
      } else {
        const updatedBin = bin.map((mail) => ({ ...mail, isChecked: true }));
        return {
          ...state,
          bin: [...updatedBin],
          binSelectorActive: !state.binSelectorActive
        };
      }
    }

    default:
      return state;
  }
};
