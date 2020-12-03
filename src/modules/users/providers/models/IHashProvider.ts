export default interface IHashProvider {
  generateHash(payload: string): Promise<string> | string;
  compareHash(payload: string, hashed: string): Promise<boolean> | boolean;
}
