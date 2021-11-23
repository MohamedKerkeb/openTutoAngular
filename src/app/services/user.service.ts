import { Subject } from "rxjs";
import { User } from "../models/user.model";

export class UserService {
    private users: User[] = [
        {
            firstName: 'Jhon',
            lastName: 'Doe',
            email: 'jhon@deo.com',
            drinkPreference: 'Coca',
            hobbies: [
                'coder',
                'boire du café'
            ]
        }
    ];
    userSubject = new Subject<User[]>();

    emiUsers(){
        this.userSubject.next(this.users.slice())
    }

    addUser(user: User) {
        this.users.push(user)
        this.emiUsers()
    }
}