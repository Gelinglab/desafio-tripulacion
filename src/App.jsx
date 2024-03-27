import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Main from "./components/Main";
import Header from "./components/Header/Header";
import { AsyncProvider } from "./context/asincContext/AsyncProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <AsyncProvider>

            <Header />

            <Main />
            
          </AsyncProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
