import { Injectable } from '@angular/core';
import { Task } from '../app/models/task.interface';
import { BehaviorSubject } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DataSaverServiceService {

  taskList:Array<Task>=new Array();
  list$ = new BehaviorSubject<Task[]>(this.taskList);// dollarsign is a convention in js prog that its an observable


  constructor() 
  {
    this.loadData().then((data:Array<Task>)=>
    {
      //retreive the data and add to task list
      data.forEach((item) => {
        this.taskList.push(item);
      });
      this.sortList();
      this.list$.next(this.taskList);
    });
   }

  addToList(task:Task)
  //receive task , call on our observable List$ the function next 
  {
    this.taskList.push( task );
    this.list$.next(this.taskList); //list is observableSubject/doesnt broadcast automaticilly|| broadcast auto with initial data : 
    this.sortList();
    this.saveData();
  }

  deletFromList( id:number)
  {
    this.taskList.forEach((task:Task, index)=>{
      if(task.start ==id)
      {
        this.taskList.splice(index , 1);
      }
    });
    this.list$.next(this.taskList);
  }

  //new method to save data
  saveData()
  {
    let data = JSON.stringify(this.taskList);
    try 
    {
      window.localStorage.setItem("task",data);
      if(!window.localStorage.getItem("task"))
      {
        throw("local storage not available");
      } 
    } 
    catch (exc)
    {
      console.log( exc );
    }
  }

  loadData()
  {
    return new Promise((resolve,reject) => 
    {
      if(!window.localStorage.getItem("task"))
      {
        reject(false);
      }
      else
      {
        let data = JSON.parse( window.localStorage.getItem("task"));
        resolve(data);
      }
    });
  }

  sortList()
  {
    this.taskList.sort((task1:Task,task2:Task)=>{
      return task2.stop-task1.stop;
    })
  }
}
