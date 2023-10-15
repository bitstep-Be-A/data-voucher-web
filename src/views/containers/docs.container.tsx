import { useEffect, useState, useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";

import { DocsContext } from "../../context/docs.context";
import { docNodeState, useDocNodeQuery } from "../../recoil/app/DocNodeQuery";
import { docFolderMutation_create, docFolderMutation_delete } from "../../recoil/app/DocFolderMutation";
import { docFileMutation_create, docFileMutation_delete } from "../../recoil/app/DocFileMutation";
import { useAuth } from "../../context/auth.context";

const DocsProvider = ({ children }: { children: React.ReactNode }) => {
  const [didAlert, setDidAlert] = useState<boolean>(false);  // alert가 두번 불러오는 것 방지
  const docNodeLoadable = useRecoilValueLoadable(docNodeState);

  const mutations = [
    useRecoilValueLoadable(docFolderMutation_create),
    useRecoilValueLoadable(docFileMutation_create),
    useRecoilValueLoadable(docFolderMutation_delete),
    useRecoilValueLoadable(docFileMutation_delete)
  ];

  const {logout} = useAuth();
  const {refresh} = useDocNodeQuery();

  useEffect(() => {
    for (let loadable of mutations) {
      if (loadable.state === "hasError") {
        if (loadable.contents.code === 401) logout();
        else {
          if (didAlert) return;
          alert("에러가 발생했습니다.");
          console.error(loadable.contents);
          setDidAlert(true);
        }
        return;
      }
      if (loadable.state === "loading") {
        loadable.toPromise().then((result) => {
          if (!!result) {
            refresh();
          }
        });
      }
    }

    setDidAlert(false);
  }, [mutations, logout, didAlert]);

  const element = useMemo(() => {
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
        logout();
        return <></>;
    }
  }, [docNodeLoadable, logout]);

  return element;
}

const DocsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <DocsProvider>
      {children}
    </DocsProvider>
  );
}

export default DocsContainer;
