import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress  } from "@mui/material";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{
            width: '100vw', 
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CircularProgress 
              size="3rem" 
              sx={{
                color: 'var(--color-red)'
              }}
            />
          </div>
          }
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );