import SessionProvider from "@/provider/session-provider";
import RootRouter from "@/root-router";

function App() {
  return (
    <SessionProvider>
      <RootRouter />
    </SessionProvider>
  );
}

export default App;
