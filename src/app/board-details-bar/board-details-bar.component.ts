import { Component, OnInit, Input } from '@angular/core';
import { BoardDataService } from '../_services/board-data.service';
import { UserForAdd } from '../_models/userForAdd';

@Component({
  selector: 'app-board-details-bar',
  templateUrl: './board-details-bar.component.html',
  styleUrls: ['./board-details-bar.component.css']
})
export class BoardDetailsBarComponent implements OnInit {

  constructor(private boardService: BoardDataService) { }


  @Input() userIsOwner: boolean;
  @Input() boardId: number;
  @Input() boardOwnerId: number;
  @Input() boardTitle: string;

  userToAdd: UserForAdd = { Username: "" };
  boardUsers: any;
  addUserErrMsg: string;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.boardService.getBoardUsers(this.boardId).subscribe(x => this.boardUsers = x);
  }
  addUserToBoard() {
    this.boardService.addUserToBoard(this.userToAdd, this.boardId).subscribe(x => { this.getUsers(); this.addUserErrMsg = "Succes" },
      error => {
        this.addUserErrMsg = error.error;
        console.log(error);
      });
  }
  removeUserFromBoard(userId: number) {
    this.boardService.removeUserFromBoard(this.boardId, userId).subscribe(() => this.getUsers());
  }
  resetValues() {
    this.addUserErrMsg = "";
    this.userToAdd.Username = "";
  }
}
