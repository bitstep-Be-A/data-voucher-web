import { useRecoilValueLoadable } from "recoil";

import { DocsContext } from "../../context/docs.context";
import { docNodeState } from "../../recoil/app/DocNodeQuery";
import { routes } from "../../routes/path";
import { docFolderMutation_create } from "../../recoil/app/DocFolderMutation";

const DocsProvider = ({ children }: { children: React.ReactNode }) => {
  const docNodeLoadable = useRecoilValueLoadable(docNodeState);
  useRecoilValueLoadable(docFolderMutation_create);

  switch (docNodeLoadable.state) {
    case 'hasValue':
      return (
        <DocsContext.Provider value={{
          docNode: docNodeLoadable.contents,
          isLoading: false,
        }}>
          {children}
        </DocsContext.Provider>
      );
    case 'loading':
      return (
        <DocsContext.Provider value={{
          isLoading: true,
        }}>
          {children}
        </DocsContext.Provider>
      );
    case 'hasError':
      console.error(docNodeLoadable.contents);
      window.location.replace(routes.login.path);
      return <></>;
  }
}

const DocsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <DocsProvider>
      {children}
    </DocsProvider>
  );
}

export default DocsContainer;
