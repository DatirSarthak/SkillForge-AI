import AppRouter from "./routes/AppRouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";

function App() {

    return (

        <ThemeProvider>

            <Toaster
                position="top-right"
            />

            <AppRouter />

        </ThemeProvider>

    );

}

export default App;