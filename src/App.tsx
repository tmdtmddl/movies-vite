import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLoading from "./app/components/loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = lazy(() => import("./app/page"));
const Detail = lazy(() => import("./app/[mid]/page"));

const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Suspense fallback={<RootLoading />}>
        <BrowserRouter basename={import.meta.env.DEV ? "/" : "/movies-vite"}>
          <Routes>
            <Route path="/">
              <Route index Component={Home} />
              <Route path=":mid" Component={Detail} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
