import { Component, OnInit } from '@angular/core';
import { BoardDataService } from '../_services/board-data.service';
import { newBoard } from '../_models/newBoard';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  newBoardData: newBoard = {
    userId: 0,
    boardName: ""
  };

  boards: any;
  inputHidden: boolean = true;

  constructor(private boardService: BoardDataService) { }

  ngOnInit() {
    this.displayBoards();
  }
  createBoard(form: NgForm) {
    console.log(this.newBoardData);
    this.boardService.createBoard(this.newBoardData).subscribe(() => { this.displayBoards(); form.reset(); this.inputHidden = true; });
  }
  toggleInput() {
    this.inputHidden = !this.inputHidden;
  }
  displayBoards() {
    this.boardService.getBoards().subscribe(x => {
    this.boards = x;
      console.log(this.boards)
    });
  }
}
