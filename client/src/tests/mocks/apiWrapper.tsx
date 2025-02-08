import { ReactNode } from "react";

import { Provider } from "react-redux";

import { store } from "../../store/store";

export const apiWrapper = () => {
  const storeRef = store;
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={storeRef}>{children}</Provider>
  );

  return {
    store: storeRef,
    wrapper,
  };
};
