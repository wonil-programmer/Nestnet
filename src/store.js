import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./routes/Gallery/Form/formReducer";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
