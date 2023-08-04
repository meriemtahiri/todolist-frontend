import "./styles.css";
import { Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import TodoList from "./components/todos/TodoList";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/">
            <TodoList />
          </Route>
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools position="bottom-left" />
    </QueryClientProvider>
  );
}
