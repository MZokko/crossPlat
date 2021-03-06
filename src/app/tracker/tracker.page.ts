import { Component, OnInit } from '@angular/core';
import{ Validators , FormBuilder, FormGroup } from '@angular/forms';
import {timer, Subscription} from 'rxjs';


import { DataSaverServiceService } from '../data-saver-service.service'
import { Task } from '../models/task.interface';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  taskForm : FormGroup;
  started:Boolean = false;
  startTime:number;
  stopTime:number;

  timerSub:Subscription;
  time:number;

  //dependency injection = add the dependency as a part of the class
  constructor(
    private formBuilder : FormBuilder,
    //adding the data service
    private dataService :DataSaverServiceService
  ) { }

  ngOnInit() //is executed after the constroctor 
  {
    this.taskForm = this.formBuilder.group(
      {
        //validator requierd = this field cant be empty 
        //validator minlegn this field have to nbe that long
        name : ['', [Validators.required,Validators.minLength(3)]]
      });
  }

  start(){
    this.started = true;
    //this is used because startTime is a property
    this.startTime = new Date().getTime();
    const tm = timer(0,1000);
    this.timerSub = tm.subscribe(val => this.time = val);

    console.log(this.startTime);

  }

  stop(){
    this.started = false;
    this.stopTime = new Date().getTime();
    this.timerSub.unsubscribe();//will stop the timer
    //save the task
    this.save();
    this.taskForm.reset();
    console.log(this.stopTime);
  }

  save()
  {
    let task:Task = {
      name: this.taskForm.get('name').value,
      start: this.startTime,
      stop:this.stopTime
    }
    this.dataService.addToList( task );// add the task to the array
  }
}
