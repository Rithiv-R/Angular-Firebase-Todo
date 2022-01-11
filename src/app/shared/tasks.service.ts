import { Message } from '../modules/list'
import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import {Adder} from '../modules/count'

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  items!:Observable<any[]>
  adder!:[]
  constructor(public fs: AngularFirestore) { 
    this.items = this.fs.collection('Todolist').valueChanges();
  }

  readtasks() : Observable<any>
  {
    return this.items;
  }

  deletetasks(doc:string)
  {
    this.fs.collection('Todolist').doc(doc).delete()
  }

  async addtask(val:any)
  {
    if(val)
    {
      await this.fs.collection('Counter').doc('Count').get().toPromise().then((res: any) => {
        let x = res.get('count')+1
        this.fs.collection('Todolist').doc('task'+x.toString()).set({Message:val,id:'task'+x.toString()});
        this.fs.collection('Counter').doc('Count').update({count:x})
      });
    }
  }

  async update(msg:any,ind:any)
  {
    if(msg)
    {
      if(ind)
      {
        await this.fs.collection('Todolist').doc(ind).update({Message:msg,id:ind})
      }
    }
  }
}


