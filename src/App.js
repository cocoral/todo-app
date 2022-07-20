import { Typography } from "antd";
import "./App.css";
import TodoApp from "./Components/TodoApp";

const { Title } = Typography;

function App() {
  return (
    <div className="app">
      <Title>Plooto To-do App</Title>
      <TodoApp />
      <footer className="footer">
        Code by{" "}
        <a
          href="https://www.linkedin.com/in/coralxhe/"
          target="_blank"
          rel="noreferrer"
        >
          @Coral
        </a>
      </footer>
    </div>
  );
}

export default App;
