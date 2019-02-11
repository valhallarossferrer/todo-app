import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Todo } from '../models/todo.interface';
import { TodoList } from '../models/todoList.interface';



@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(public firestore: AngularFirestore) { }

  createTodo(todo: Todo) {
    return this.firestore.collection('todoList').add(todo);
  }

  createTodoList(todoList: TodoList) {
    return this.firestore.collection('collection').add(todoList);
  }

  async getTodoList() {
    const list = [];
    await this.firestore.collection('todoList').get().subscribe(todoList => {
      console.log('subscribe', todoList);
      todoList.docs.forEach(doc => {
        list.push(doc.data());
      });
    });
    return list;
  }

  deleteTodo(todoId: string): Promise<void> {
    return this.firestore.doc(`todoList/${todoId}`).delete();
  }

  async getCollection() {
    const list = [];
    await this.firestore.collection('collection').get().toPromise()
      .then(collection => {
        console.log('subscribe', collection);
        collection.docs.forEach(doc => {
          list.push(doc.data());
        });
      });
    return list;
  }

}
