import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private showUpdateTask: boolean = false;
  private addTaskSubject = new Subject<any>();
  private updateTaskSubject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.addTaskSubject.next(this.showAddTask);
  }

  toggleUpdateTask(): void {
    this.showUpdateTask = !this.showUpdateTask;
    this.updateTaskSubject.next(this.showUpdateTask);
  }

  onToggle(): Observable<any> {
    return this.addTaskSubject.asObservable();
  }

  onToggleUpdate(): Observable<any> {
    return this.updateTaskSubject.asObservable();
  }
}
