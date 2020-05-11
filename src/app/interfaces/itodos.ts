import {IDate} from './idate';

export interface ITodos {
  id: number;
  task: string;
  completed: boolean;
  created: Date;
  deadline: Date;
  priority: string;
}