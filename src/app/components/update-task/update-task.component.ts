import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnChanges {
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  @Input() task?: Task;
  @Input() showUpdateTask?: boolean = false;
  text?: string;
  day?: string;
  reminder: boolean = false;

  constructor() {}

  ngOnChanges({ task: taskChanges }: SimpleChanges): void {
    if (!taskChanges?.firstChange) {
      this.showUpdateTask = true;
    }
    const { currentValue } = taskChanges || {};
    this.task = currentValue;
    this.text = currentValue?.text;
    this.day = currentValue?.day;
    this.reminder = currentValue?.reminder;
  }

  onSubmit() {
    if (!this.text) {
      return;
    }

    const updatedTask: Task = {
      id: this.task?.id,
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.closeForm();
    this.emitUpdatedTask(updatedTask);
  }

  private closeForm() {
    this.showUpdateTask = false;
  }

  private emitUpdatedTask(task: Task) {
    this.onUpdateTask.emit(task);
  }
}
