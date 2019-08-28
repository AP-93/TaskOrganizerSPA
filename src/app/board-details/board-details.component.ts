import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardDataService } from '../_services/board-data.service';
import { newList } from '../_models/newList';
import { newCard } from '../_models/newCard';
import { userForAdd } from '../_models/userForAdd';
import { Board, Card } from '../_models/boardData';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private boardService: BoardDataService) { }

  formId: number = null;
  listName: string;
  showAddacardText: boolean = true;
  showCardDetails: boolean = false;
  boardUsers: any;
  userIsOwner: boolean;
  boardData: Board;
  cardData: Card;
  userToAdd: userForAdd = { Username: "" };
  newList: newList = {
    boardId: 0,
    ListName: ""
  };
  newCard: newCard = {
    boardId: 0,
    listId: 0,
    cardName: ""
  }
  ngOnInit() {
    this.newCard.boardId = this.newList.boardId = +this.route.snapshot.paramMap.get('id');
    this.displayLists();
  }
  createList() {
    this.boardService.createList(this.newList).subscribe(() => this.displayLists());
    this.newList.ListName = "";
  }
  createCard(listID: number) {
    this.newCard.listId = listID;
    this.boardService.createCard(this.newCard).subscribe(() => this.displayLists());
    this.newCard.cardName = "";
    this.formId = null;
  }
  displayLists() {
    this.boardService.getLists(this.newList.boardId).subscribe(x => { this.boardData = x; this.userIsOwner = (this.boardData.ownerId == this.boardService.getId()) });
  }
  toggleForm(i: number) {
    this.formId = i;
    this.showAddacardText = false;
    this.newCard.cardName = "";
  }
  deleteList(boardId: number, listId: number) {
    this.boardService.deleteList(boardId, listId).subscribe(() => this.displayLists());
  }
  deleteAllCards(boardId: number, listId: number) {
    this.boardService.deleteAllCards(boardId, listId).subscribe(() => this.displayLists());
  }
  openCardDetails(c: Card, ln: string) {
    this.cardData = c;
    this.listName = ln;
    this.showCardDetails = true;
  }
}
