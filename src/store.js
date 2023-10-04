import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./routes/Gallery/Form/formReducer";
import albumReducer from "./routes/Gallery/albumReducer";

const store = configureStore({
  reducer: {
    form: formReducer,
    album: albumReducer,
  },
});

export default store;
