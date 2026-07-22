import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import HomePage from "./pages/HomePage"
import StoryPage from "./pages/StoryPage";
import ChapterPage from "./pages/ChapterPage";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/stories/:storyId",
          element: <StoryPage />,
        },
      ],
    },
    {
      path: "/stories/:storyId/chapters/:translationId",
      element: <ChapterPage />,
    },
  ],
  {
    basename: "/story-harbor",
  }
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
