import { useContext, createContext } from "react";

interface IContainerContext {
  mainScreenRef: React.RefObject<HTMLDivElement | null>;
  menuBarState: [boolean, (state: boolean) => void];
}

export const ContainerContext = createContext<IContainerContext | undefined>(undefined);

export const useContainer = (): IContainerContext => {
  const containerContext = useContext(ContainerContext);
  if (!containerContext) {
    throw new Error('useContainer must be used within an ContainerProvider');
  }

  return containerContext;
}
