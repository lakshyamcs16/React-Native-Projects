import { base, darkTheme, lightTheme, colorOptions } from "../../../themes/theme";

const initialState = {
  theme: { ...base, ...lightTheme, ...colorOptions.blue }
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTION_TYPE":
      return;
    default:
      return state;
  }
};

