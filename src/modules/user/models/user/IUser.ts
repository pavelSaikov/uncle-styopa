import { IAddress } from '../address';

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  patronymic: string;
  address: IAddress;
}
