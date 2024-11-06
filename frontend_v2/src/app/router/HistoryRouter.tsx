import { useLayoutEffect, useState } from "react";
import { BrowserRouterProps, Router } from "react-router-dom";
import { BrowserHistory } from "history";

interface HistoryRouterProps extends BrowserRouterProps {
  history: BrowserHistory;
}

export const HistoryRouter = ({ basename, history, children }: HistoryRouterProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState)
  }, [history]);

  return (
    <Router
      navigator={history}
      location={state.location}
      navigationType={state.action}
      children={children}
      basename={basename}
    />
  );
};  