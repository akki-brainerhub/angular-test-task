import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '';

export interface Todo {
    id: any;
    name: string;
    address: string;
    city: string;
    race: string;
    drivenlicence: string;
    genere: string;
    bloodtype: string;
}
@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private _todo = new BehaviorSubject<Todo[]>([]);
    readonly todos$ = this._todo.asObservable();
    private todos: Todo[] = [];
    private nextId = 0;

    constructor(private http: HttpClient) { }

    loadAll() {
        this.todos = [];
        this._todo.next(this.todos);
    }

    create(item: Todo) {
        item.id = ++this.nextId;
        this.todos.push(item);
        this._todo.next(Object.assign([], this.todos));
    }

}
