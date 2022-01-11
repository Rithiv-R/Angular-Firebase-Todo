import { Component,OnInit} from '@angular/core';
import {TasksService} from './shared/tasks.service';
import {Message} from './modules/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo';
  myarray!:any;
  index!:any;
  updatind!:any;
  constructor(private service:TasksService){}

  ngOnInit() {
      this.service.readtasks().subscribe(val => this.myarray=val);
  }

  onclick(doc:string)
  {
     this.service.deletetasks(doc);
  }

  onadd(val:any)
  {
    this.service.addtask(val)
  }

  onupdate(val:any,myturn:any)
  {
    this.index=myturn;
    this.updatind=val;
  }

  onupdate1(val:any)
  {
    this.service.update(val,this.updatind)
  }
}
