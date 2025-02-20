
export function generateID(): string {
  const characters = "0123456789";
  let IDNumber = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    IDNumber += characters[randomIndex];
  }
  return IDNumber;
}