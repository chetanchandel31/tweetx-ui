import useApiWakeUp from "./hooks/useApiWakeUp";
import AllProviders from "./providers/AllProviders";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useApiWakeUp();

  return (
    <AllProviders>
      <AppRoutes />
    </AllProviders>
  );
}

export default App;
