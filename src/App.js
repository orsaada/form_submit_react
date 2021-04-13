import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import FormVer2 from "./FormVer2";
import { StylesProvider } from "@material-ui/styles";
import { jss } from "react-jss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <Form /> */}
      <StylesProvider jss={jss}>
        <FormVer2 />
      </StylesProvider>
    </div>
  );
}

export default App;
