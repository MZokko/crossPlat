import { Injectable } from '@angular/core';
import { Task } from '../app/models/task.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSaverServiceService {

  taskList:Array<Task>=new Array();
  list$ = new BehaviorSubject<Task[]>(this.taskList);// dollarsign is a convention in js prog that its an observable


  constructor() { }

  addToList(task:Task)
  //receive task , call on our observable List$ the function next 
  {
    this.taskList.push( task );
    this.list$.next(this.taskList); //
  }
}
