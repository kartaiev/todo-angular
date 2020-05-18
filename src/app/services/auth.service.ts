import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  private isLogged = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLogged.asObservable();

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.userData = fireAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  SignIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  SignOut() {
    this.fireAuth.signOut().then(() => {
        this.router.navigateByUrl('/login')
          .then(r => console.log('logged out', r));
      });
    this.setIsLogged(false);
  }

  setIsLogged(isLogged: boolean): void {
    this.isLogged.next(isLogged);
  }

}
