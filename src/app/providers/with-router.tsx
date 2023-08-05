import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress  } from "@mui/material";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={<CircularProgress size="3rem" />}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );