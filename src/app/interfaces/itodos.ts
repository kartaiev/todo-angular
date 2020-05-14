import {IDate} from './idate';

export interface ITodos {
  id: number;
  uid: string;
  task: string;
  completed: boolean;
  created: Date;
  deadline: IDate;
  priority: string;
}
