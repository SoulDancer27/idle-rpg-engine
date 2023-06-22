import saveAs from "file-saver";
import { FileDataFormat } from "../Interfaces";

export function localStorageToFile(keys: Array<string>) {
  let save: Record<string, JSON> = {};
  try {
    for (let item of keys) {
      let data = localStorage.getItem(item);
      if (!data) throw new Error("Save data not found in local storage");
      save[item] = JSON.parse(data);
    }
    const blob = new Blob([JSON.stringify(save)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "save.json");
  } catch (error) {
    console.log(error);
  }
}

export async function fileToGameData(
  file: File,
  format: Array<FileDataFormat<any>>
) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    for (let item of format) {
      if (!data[item.key]) continue;
      item.setContext(data[item.key]);
    }
  } catch (error) {
    console.log(error);
  }
}
