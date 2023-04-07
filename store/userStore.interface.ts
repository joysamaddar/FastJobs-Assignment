export default interface UserStoreInterface {
  user: string | null;
  setUser: (user: string) => void;
  removeUser: () => void;
}
