import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";

function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    );
}

export default App;
