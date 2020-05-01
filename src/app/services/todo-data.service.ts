import {Injectable} from '@angular/core';
import {ITodos} from '../itodos';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private db: AngularFirestore) {
  }

  getTodos(): Observable<ITodos[]> {
    return this.db.collection<ITodos>('tasks').snapshotChanges().pipe(
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

  async addTask(obj): Promise<void> {
    try {
      await this.db.collection('tasks').add(obj);
    } catch {
      console.error('error');
    }
  }

  completeTask(id: number): void {
    from(this.db.doc(`tasks/${id}`).update({completed: true}));
  }

  deleteTask(id: number): void {
    from(this.db.doc(`tasks/${id}`).delete());
  }

}


