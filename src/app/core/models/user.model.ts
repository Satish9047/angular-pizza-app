export class User {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public phone: string,
    public address: string,
    public isVerified: boolean,
    public role: string,
    public createdAt: string,
    public updatedAt: string,
    public __v: number,
  ) {}
}
