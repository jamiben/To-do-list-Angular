import {asNativeElements, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TaskModel} from "./models/task.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('textInput',{static: true}) textInput: ElementRef | undefined;
  @Output() removeTask: EventEmitter<number> = new EventEmitter<number>();

  title = 'Todo List';

  tasks: TaskModel[] = [];

  input: string = '';


  ngOnInit(){
    if(localStorage.getItem('task') != null){
      this.tasks = JSON.parse(localStorage.getItem('task')!);
    };
}

  addNewTask(): void {
    localStorage.setItem('task', JSON.stringify(this.tasks));

    const task: TaskModel = {
      id: this.tasks.length + 1,
      task: this.textInput?.nativeElement.value,
    }
    this.tasks.push(task);
    this.input = '';
    console.log(this.input);
  }



  clearInput(): void {
    this.input = "";
  }

// enfant = document.querySelector("task");

// parent = document.querySelector("tasks-wrappe");

//delete par index pas bon
  // deletTask(index: number): void {
  //   if(index > 0){
  //   this.tasks = this.tasks.filter(task => task.id === index);
  //   this.tasks.splice(0, 1);
  //   }
  // }

//delete par id avec splice() et findIndex() tout deux séléctionnent l'index
//mais la fonction fléché utilise l'id
  // deletTask(id: number): void {
  //   const task =this.tasks.findIndex((tasks)=>tasks.id === id);
  //   this.tasks.splice(task, 1);
  //   console.log(this.tasks);
  // }


// deletTask(id:number):void{
// this.tasks = this.tasks.filter( (item,id) => item !== id);
// console.log(this.deletTask);
// }

  deletTask(id:number):void {
    this.tasks = this.tasks.filter(task => task.id != id);
  }

  checkInput(): boolean{
    if(this.input != ''){
      alert("add task");
      return true;
    }else {
    return false;
    }
  }
}
