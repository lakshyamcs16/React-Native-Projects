export default interface User {
    getUser(): User;
    login(username: string, password: string): User;
    logout(username: string): boolean;
    IsLoggedIn(): boolean;
}