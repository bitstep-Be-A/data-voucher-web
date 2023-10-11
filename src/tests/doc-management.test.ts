import {
  DocFolder,
  DocFile
} from "../domain/doc-management/docs.interface";
import {
  folderValidator,
  folderExceptionMap
} from "../domain/doc-management/docs.impl";
import DocFolderDriver from "../driver/DocFolderDriver";
import type { ExceptionDetail } from "../types/common";
import { FOLDER_NAME_MAX_LENGTH } from "../policies/document.policy";

describe('폴더', () => {
  it('폴더 이름을 지정합니다.', () => {
    let exception: ExceptionDetail | null = null;
    // 폴더 이름은 공백이 들어가서는 안됩니다.
    exception = folderValidator.checkBlankFolderName("");
    expect(exception).toBe(folderExceptionMap.FOLDER_NAME_IS_BLANK);

    // 초기화
    exception = null;

    // 폴더 이름은 최대 25자 이내입니다.
    exception = folderValidator.checkFolderNameMaxLength("*".repeat(FOLDER_NAME_MAX_LENGTH));
    expect(exception).toBe(null);

    exception = folderValidator.checkFolderNameMaxLength("*".repeat(FOLDER_NAME_MAX_LENGTH + 1));
    expect(exception).toBe(folderExceptionMap.FOLDER_NAME_MAX_LENGTH_OVER);
  });

  it('폴더를 생성합니다.', async () => {
    const req = {
      id: undefined,
      parent: null,
      name: '문서1'
    }
    const driver = await DocFolderDriver.manager.create(req);
  
    expect(driver.action.data['folder_name']).toBe(req.name);
    expect(driver.action.data['parent_folder_id']).toBe(req.parent);
  });

  it('폴더 id로 폴더를 제거합니다.', async () => {
    const docFolderId = 1;
    const driver = await DocFolderDriver.manager.delete(docFolderId);

    expect(driver.action.data['folder_id']).toBe(docFolderId);
  });

  it('폴더 이름을 입력하면 입력된 이름으로 변경됩니다.', () => {
    
  });

  it('폴더 위치 지정하기', () => {});

  it('폴더의 생성과 변경, 삭제 관련 피드백이 화면에 반영됩니다.', () => {});
});

test('현재 위치에서 뒤로가기', () => {});

test('특정 위치로 이동하기', () => {});
