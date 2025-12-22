import { Route, Routes } from "react-router";
import "@/App.css";
import IndexPage from "@/pages/index-page";
import LoginPage from "@/pages/login-page";
import SignupPage from "@/pages/signup-page";
import AuthLayout from "@/layouts/auth-layout";
import TodoListPage from "@/pages/todo-list-page";
import TodoDetailPage from "@/pages/todo-detail-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route path="/todolist" element={<TodoListPage />} />
      <Route path="/todolist/:id" element={<TodoDetailPage />} />
    </Routes>
  );
}

export default App;
