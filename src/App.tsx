import AllProviders from "./providers/AllProviders";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AllProviders>
      <AppRoutes />
    </AllProviders>
  );
}

export default App;
