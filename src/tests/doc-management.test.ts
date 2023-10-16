import {
  folderValidator,
  folderExceptionMap
} from "../domain/doc-management/docs.impl";
import DocFolderDriver from "../driver/DocFolderDriver";
import { getNodeFromTree } from "../driver/DocNodeDriver";
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
    expect(driver.action.data['parent_folder_id']).toBe(undefined);
  });

  it('폴더 id로 폴더를 제거합니다.', async () => {
    const docFolderId = 1;
    const driver = await DocFolderDriver.manager.delete(docFolderId);

    expect(driver.action.data['folder_id']).toBe(docFolderId);
  });

  it('폴더 이름을 입력하면 입력된 이름으로 변경됩니다.', () => {

  });

  it('폴더 위치 지정하기', () => { });

  it('폴더의 생성과 변경, 삭제 관련 피드백이 화면에 반영됩니다.', () => { });
});

test('현재 위치의 폴더와 파일을 조회합니다', () => {
  const validIdList = [
    32, 33, 35, 36, 39
  ];
  for (let _id of validIdList) {
    const node = getNodeFromTree(_id, _testDocTree);
    expect(node.folderId).toBe(_id);
  }
});

test('현재 위치에서 뒤로가기', () => { });

test('특정 위치로 이동하기', () => { });

const _testDocTree = {
  "message": "User folder and files fetched",
  "user_root_folder_name": "77_\uc774\uc9c4\ud601\ub2d8\uc758 \ud3f4\ub354",
  "folder_tree": [
    {
      "folder_id": null,
      "parent_folder_id": null,
      "folder_name": "77_\uc774\uc9c4\ud601\ub2d8\uc758 \ud3f4\ub354",
      "files": [],
      "subfolders": [
        {
          "folder_id": 32,
          "parent_folder_id": null,
          "folder_name": "\ud3f4\ub3543",
          "files": [],
          "subfolders": [
            {
              "folder_id": 35,
              "parent_folder_id": 32,
              "folder_name": "\ud3f4\ub3542",
              "files": [
                {
                  "file_id": 27,
                  "file_name": "\u1105\u1169\u1100\u1173\u110b\u1175\u11ab \u1112\u116c\u110b\u116f\u11ab\u1100\u1161\u110b\u1175\u11b8 \u1103\u1166\u110b\u1175\u1110\u1165.pdf",
                  "folderID of file": 35
                }
              ],
              "subfolders": []
            },
            {
              "folder_id": 36,
              "parent_folder_id": 32,
              "folder_name": "\uc774\uc9c4\ud601\ub2d8\uc758 \ud3f4\ub354",
              "files": [],
              "subfolders": []
            },
            {
              "folder_id": 39,
              "parent_folder_id": 32,
              "folder_name": "hihih",
              "files": [
                {
                  "file_id": 28,
                  "file_name": "\u1105\u1169\u1100\u1173\u110b\u1175\u11ab \u1112\u116c\u110b\u116f\u11ab\u1100\u1161\u110b\u1175\u11b8 \u1103\u1166\u110b\u1175\u1110\u1165.pdf",
                  "folderID of file": 39
                }
              ],
              "subfolders": []
            }
          ]
        },
        {
          "folder_id": 33,
          "parent_folder_id": null,
          "folder_name": "\ud3f4\ub3544",
          "files": [],
          "subfolders": [
            {
              "folder_id": 40,
              "parent_folder_id": 33,
              "folder_name": "\ud3f4\ub3545",
              "files": [],
              "subfolders": []
            }
          ]
        }
      ]
    }
  ]
}
