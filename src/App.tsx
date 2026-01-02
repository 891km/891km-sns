import ModalProvider from "@/provider/modal-provider";
import { PostEditorProvider } from "@/provider/post-editor/post-editor-provider";
import SessionProvider from "@/provider/session-provider";
import RootRouter from "@/root-router";

function App() {
  return (
    <SessionProvider>
      <PostEditorProvider>
        <ModalProvider>
          <RootRouter />
        </ModalProvider>
      </PostEditorProvider>
    </SessionProvider>
  );
}

export default App;
