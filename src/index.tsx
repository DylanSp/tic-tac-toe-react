import { createRoot } from "react-dom/client";
import "typeface-amatic-sc";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

registerServiceWorker();
