import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./routes/Gallery/Form/formReducer";
import albumReducer from "./routes/Gallery/albumReducer";
import commentReducer from "./routes/Gallery/commentReducer";

const store = configureStore({
  reducer: {
    form: formReducer,
    album: albumReducer,
    comment: commentReducer,
  },
});

export default store;
