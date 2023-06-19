interface FileInfo {
  name: string;
  size: number;
  type: "FOLDER" | "FILE";
  id: number;
  modificationdate: number;
  parent_id: number;
  storage_id: number;
}

interface StorageInfo {
  id: number;
  StorageDescription: string;
  VolumeIdentifier: string;
}

interface Device {
  vendor: string;
  vendor_id: number;
  product: string;
  product_id: number;
}

/**
 * @description mtp instance
 */
interface mtp {
  /**
   * @description Connect device, If parameters vendor id and product id not set,the first device found will be connected
   * @param vid the device vender_id
   * @param pid the device product_id
   * @returns `boolean` Get `true` if the operate was successful
   * @see To access a certain device through vendor id and product id, you can get device information through getDeviceInfo method.
   */
  connect(vid?: number, pid?: number): boolean;
  /**
   * @description Release the currently connected device. `Notice` The device needs to be released after use, otherwise an error will be reported when connecting again.
   * @returns `boolean`  Get true if the operate was successful
   */
  release(): boolean;
  /**
   * @description Get file tree by a mtp device parent path.
   * @param parentPath  The root address can be passed in the string `/`.
   * @returns `Array<FileInfo>` File info array
   * @example
   *
   *        [{
   *            name: '1',
   *            size: 0,
   *            type: 'FOLDER',
   *            id: 156,
   *            modificationdate: 1672041505,
   *            parent_id: 152,
   *            storage_id: 65537
   *        },
   *        {
   *            name: 'download.zip',
   *            size: 8893742,
   *            type: 'FILE',
   *            id: 158,
   *            modificationdate: 1673321627,
   *            parent_id: 152,
   *            storage_id: 65537
   *        }]
   *
   */
  getList(parentPath: string): Array<FileInfo>;
  /**
   * @description If multiple devices are connected, the device list can be obtained through this method.
   * @returns `Array<Device>` Device information array
   * @example
   * [{
   *    vendor: 'MediaTek Inc',
   *    vendor_id: 3725,
   *    product: 'Elephone P8000',
   *    product_id: 8221
   *  }]
   */
  getDeviceInfo(): Array<Device>;
  /**
   * @description Upload local files to the device.
   * @param localFilePath  Local file path to upload
   * @param targetFolderPath Target device parent folder path
   * @param progressCallBackFn Callback function for upload progress`(progress, total)=>void`
   */
  upload(
    localFilePath: string,
    targetFolderPath: string,
    progressCallBackFn: (progress: number, total: number) => void
  ): boolean;
  /**
   * @description Download files from device to the localPC.
   * @param targetFile Device file path to download
   * @param localFilePath Target local parent folder path
   * @param progressCallBackFn Callback function for download progress`(progress, total)=>void`
   */
  download(
    targetFile: string,
    localFilePath: string,
    progressCallBackFn: (progress: number, total: number) => void
  ): boolean;
  /**
   * @description This function deletes a single file, track, playlist, folder or any other object of the MTP device, identified by the object ID.
   * @param targetPath The destination address on the device to delete
   * @returns `boolean` Get true if the operate was successful
   */
  del(targetPath: string): boolean;
  /**
   * @description Obtain object information in the device, including files, folders, etc.
   * @param targetPath File path on device
   * @returns `FileInfo`Return object information
   * @example
   *
   *        {
   *        name: 'upload.zip',
   *        size: 8893742,
   *        type: 'FILE',
   *        id: 163,
   *        modificationdate: 1673149510,
   *        parent_id: 152,
   *        storage_id: 65537
   *        }
   *
   */
  get(targetPath: string): FileInfo;

  /**
   * @description The semantics of copying a folder are not defined in the spec, but it appears to do the right thing when tested (but devices that implement this operation are rare).
   * @param sourcePath The path of the file to be copied in the device
   * @param targetFolderPath parent folder path where file copy to
   * @returns `boolean` Get true if the operate was successful
   */
  copy(sourcePath: string, targetFolderPath: string): boolean;
  /**
   * @description The function moves an object from one location on a device to another location.
   * @param sourcePath The path of the file to be copied in the device
   * @param targetFolderPath  parent folder path where file copy to
   * @returns `boolean` Get true if the operate was successful
   */
  move(sourcePath: string, targetFolderPath: string): boolean;
  /**
   * @description Set the file name in device.
   * @param targetPath File path on device
   * @param newName New file name
   * @returns `boolean` Get `true` if the operate was successful
   */
  setFileName(targetPath: string, newName: string): boolean;
  /**
   * @description Rename the folder
   * @param targetPath Folder path on device
   * @param newName New folder name
   * @returns `boolean`Get `true` if the operate was successful
   */
  setFolderName(targetPath: string, newName: string): boolean;
  /**
   *
   * @param targetParentPath Folder path on device
   * @param newName folder name
   * @returns `boolean`Get `true` if the operate was successful
   */
  createFolder(targetParentPath: string, newName: string): boolean;

  /**
   * @description Get the storage information of the currently connected device.
   * @returns `Array<StorageInfo>`Storage information `array`
   * @example
   *   [{
   *        id: 65537,
   *        StorageDescription: '内部共享存储空间',
   *        VolumeIdentifier: ''
   *    }]
   */
  getCurrentDeviceStorageInfo(): Array<StorageInfo>;
  /**
   * @description Set the default device store for the currently connected device.
   * @returns  `boolean`Get true if the operate was successful
   */
  setStorage(storageId: number): boolean;
}

declare function bindings(): mtp;

export { bindings as default };
