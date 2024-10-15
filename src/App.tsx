import Router from "~/router";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from "./components/ConfirmationModal";

function App() {
  return (
    
    <Provider store={store}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <ToastContainer position="bottom-left" autoClose={1800} />
      <ConfirmationModal />
    </Provider>
  );
}

export default App;
