import { base, darkTheme, lightTheme, colorOptions } from "../../../themes/theme";

const initialState = {
  theme: { ...base, ...lightTheme, ...colorOptions.blue }
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK":
      return{
        theme: {
          ...base,
          ...darkTheme,
          ...colorOptions.teal
        }
      }
    case "LIGHT":
      return {
        theme: {
          ...base,
          ...lightTheme,
          ...colorOptions.gray
        }
      }
    default:
      return state;
  }
};

