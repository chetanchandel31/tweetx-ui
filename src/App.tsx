import ApiDelayPopover from "./components/ApiDelayPopover";
import useApiWakeUp from "./hooks/useApiWakeUp";
import AllProviders from "./providers/AllProviders";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useApiWakeUp();

  return (
    <AllProviders>
      <ApiDelayPopover />
      <AppRoutes />
    </AllProviders>
  );
}

export default App;
