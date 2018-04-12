export class UnauthorizedUser {
  public username: string;
  public password: string;
  public grant_type?: string;
  public scope?: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;

    this.grant_type = 'password';
    this.scope = 'read write';
  }
}