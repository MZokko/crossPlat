import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import{ Task} from '../models/task.interface';
import { DataSaverServiceService } from '../data-saver-service.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
//receive the array task 
history:Array<Task>=[];
historySub:Subscription;

  constructor(
    private dataService:DataSaverServiceService,
  ) { }

  ngOnInit() {
    this.historySub=this.dataService.list$.subscribe( taskData => this.history = taskData);
  }

  duration(stop,start)
  {
    return ((stop-start)/1000);
  }

  delete(itemStart)
  {
    this.dataService.deletFromList(itemStart);
    console.log(itemStart)
  }

}
