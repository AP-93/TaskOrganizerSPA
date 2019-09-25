import { Component, OnInit } from '@angular/core';
import { BoardDataService } from '../_services/board-data.service';
import { NewBoard } from '../_models/newBoard';
import { NgForm } from '@angular/forms';
import { Board } from '../_models/boardData';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  newBoardData: NewBoard = {
    userId: 0,
    boardName: ""
  };

  boards: Board[];
  inputHidden: boolean = true;

  constructor(private boardService: BoardDataService) { }

  ngOnInit() {
    this.displayBoards();
  }
  createBoard(form: NgForm) {
    this.boardService.createBoard(this.newBoardData).subscribe(() => { this.displayBoards(); form.reset(); this.inputHidden = true; });
  }
  toggleInput() {
    this.inputHidden = !this.inputHidden;
  }
  displayBoards() {
    this.boardService.getBoards().subscribe(x => {
      this.boards = x;
      this.boardService.boardData = x;
    });
  }
  drop(event: CdkDragDrop<Board[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    //console.log(this.boards, event.previousIndex, event.currentIndex)
  }
}
