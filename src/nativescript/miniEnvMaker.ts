import { Zip } from "@nativescript/zip";
import { notifyEvent } from "@nativescript/capacitor/bridge";

interface ZipOptions {
    directory: string,
    archive: string
}

native.fileZip = function (options: ZipOptions) {
  const { directory, archive } = options;
  Zip.zip({
    directory,
    archive,
    onProgress: (progress) => {
      notifyEvent('zipProgress', progress);
    },
  }).then((filePath) => {
    notifyEvent('zipComplete', filePath);
  });
};