export const saveListLocally = <T>(listToSave: T[], saveKey: string) => {
  if (!listToSave) {
    throw new Error("No data to be saved");
  }

  if (!saveKey) {
    throw new Error("The save key cannot be empty");
  }

  const listString = JSON.stringify(listToSave);
  const serializedData = Buffer.from(listString).toString("base64");

  localStorage.setItem(saveKey, serializedData);
};

export const loadListLocally = <T>(loadKey: string) => {
  if (!loadKey) {
    throw new Error("The load key cannot ve empty");
  }

  const savedSerializedData = localStorage.getItem(loadKey);
  if (!savedSerializedData) {
    return [];
  }
  const decodedStringData = Buffer.from(savedSerializedData, "base64").toString(
    "utf-8"
  );

  return JSON.parse(decodedStringData) as T[];
};
