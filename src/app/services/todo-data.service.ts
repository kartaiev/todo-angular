import {Injectable} from '@angular/core';
import {ITodos} from '../interfaces/itodos';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private isCurrent = new BehaviorSubject<boolean>(true);
  isCurrent$ = this.isCurrent.asObservable();

  private todos = new BehaviorSubject<ITodos[]>([]);
  todos$ = this.todos.asObservable();

  private filteredTodos = new BehaviorSubject<ITodos[]>([]);
  filteredTodos$ = this.filteredTodos.asObservable();


  constructor(private db: AngularFirestore) {
  }

  setIsCurrent(isCurrent: boolean): void {
    this.isCurrent.next(isCurrent);
  }

  setTodos(todos: ITodos[]): void {
    this.todos.next(todos);
  }

  setFilteredTodos(filteredTodos: ITodos[]): void {
    this.filteredTodos.next(filteredTodos);
  }


  getTodos(uid): Observable<ITodos[]> {
    return this.db.collection<ITodos>('tasks', ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(
      map(snaps => {
        return snaps.map(snap => {
          return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data(),
          };
        });
      })
    );
  }


  addTask(obj: ITodos): void {
    if (obj.task) {
      from(this.db.collection('tasks').add(obj));
    }
  }

  updateTask(id: number, data: ITodos): void {
    from(this.db.doc(`tasks/${id}`).update(data));
  }

  deleteTask(id: number): void {
    from(this.db.doc(`tasks/${id}`).delete());
  }

}


