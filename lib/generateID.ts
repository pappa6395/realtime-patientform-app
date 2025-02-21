import { v4 as uuidv4 } from "uuid";

export function generateID(): string {

  const characters = "0123456789";
  let IDNumber = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    IDNumber += characters[randomIndex];
  }
  return IDNumber;
}


export const generateCustomUUID = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const ensureUniquePatientId = (existingPatientIds: string[], length = 10) => {
  let newId = generateCustomUUID(length);
  while (existingPatientIds.includes(newId)) {
    newId = generateCustomUUID(length); // Keep generating until unique
  }
  return newId;
};