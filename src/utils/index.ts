export const saveListLocally = <T>(listToSave: T[], saveKey: string) => {
  if (!listToSave) {
    throw new Error("No data to be saved");
  }

  if (!saveKey) {
    throw new Error("The save key cannot be empty");
  }

  const listString = JSON.stringify(listToSave);
  // const serializedData = Buffer.from(listString, "utf-8").toString("base64");
  const serializedData = btoa(listString);

  localStorage.setItem(saveKey, serializedData);
  console.log("Saved attendee data");
};

export const loadListLocally = <T>(loadKey: string) => {
  if (!loadKey) {
    throw new Error("The load key cannot ve empty");
  }

  const savedSerializedData = localStorage.getItem(loadKey);
  if (!savedSerializedData) {
    return [];
  }
  // const decodedStringData = Buffer.from(savedSerializedData, "base64").toString(
  //   "utf-8"
  // );

  const decodedStringData = atob(savedSerializedData);

  const loadedData = JSON.parse(decodedStringData) as T[];

  console.log("Loading saved data:\n" + JSON.stringify(loadedData));
  return loadedData;
};
