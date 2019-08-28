import { Component, OnInit, Input } from '@angular/core';
import { BoardDataService } from '../_services/board-data.service';
import { userForAdd } from '../_models/userForAdd';

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

  userToAdd: userForAdd = { Username: "" };
  boardUsers: any;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.boardService.getBoardUsers(this.boardId).subscribe(x => this.boardUsers = x);
  }
  addUserToBoard() {
    //TODO check if user is on list, display addes user, send message user added succes or fail
    this.boardService.addUserToBoard(this.userToAdd, this.boardId).subscribe(() => this.getUsers());
  }
  removeUserFromBoard(userId: number) {
    this.boardService.removeUserFromBoard(this.boardId, userId).subscribe(() => this.getUsers());
  }

}
