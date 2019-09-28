import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardDataService } from '../_services/board-data.service';
import { NewList } from '../_models/newList';
import { NewCard } from '../_models/newCard';
import { UserForAdd } from '../_models/userForAdd';
import { Board, Card, BoardList } from '../_models/boardData';
import { MoveList } from '../_models/moveList';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MoveCard } from '../_models/moveCard';


@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private boardService: BoardDataService) { }

  formId: number = null;
  listName: string;
  dropListArray: any;
  showAddacardText: boolean = true;
  showCardDetails: boolean = false;
  boardUsers: any;
  boards: Board[];
  userIsOwner: boolean;
  boardDetails: Board;
  cardData: Card;
  userToAdd: UserForAdd = { Username: "" };
  newList: NewList = { boardId: 0, ListName: "" };
  moveList: MoveList = { currentBoardId: 0, currentListId: 0, moveToBoardId: 0, moveToListId: 0, moveToBoardName: "", maxPositions: 1 };
  moveCard: MoveCard = { currentBoardId: 0, currentListId: 0, cardId: 0, moveToListId: 0, moveToPosition: 0 };
  newCard: NewCard = { boardId: 0, listId: 0, cardName: "" };

  ngOnInit() {
    this.moveCard.currentBoardId = this.moveList.currentBoardId = this.newCard.boardId = this.newList.boardId
      = +this.route.snapshot.paramMap.get('id');
    this.displayLists();
  }

  displayLists() {
    this.boardService.getBoards().subscribe(x => {
      this.boardService.boardData = this.boards = x;
      this.boardDetails = this.boardService.boardData.find(i => i.id === this.newCard.boardId);
      this.SortCards();
      this.userIsOwner = (this.boardDetails.ownerId === this.boardService.getId());
      this.moveList.moveToBoardName = this.boardDetails.title;
      this.moveList.maxPositions = this.boardDetails.boardLists.length;
      this.addDropList(this.boardDetails.boardLists);
    });
  }
  SortCards() {
    this.boardDetails.boardLists.forEach(x => x.cards.sort((a, b) => (a.cardPosition > b.cardPosition) ? 1 : -1));
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

  deleteList(boardId: number, listId: number) {
    this.boardService.deleteList(boardId, listId).subscribe(() => this.displayLists());
  }
  deleteAllCards(boardId: number, listId: number) {
    this.boardService.deleteAllCards(boardId, listId).subscribe(() => this.displayLists());
  }

  moveToBoard(board: any) {
    this.moveList.moveToBoardId = board.id;
    this.moveList.moveToBoardName = board.title;
    this.moveList.moveToListId = this.moveList.maxPositions = board.boardLists.length;
    if (this.moveList.maxPositions === 0) {
      this.moveList.moveToListId = this.moveList.maxPositions = 1;
    }
  }
  setListPos(pos: number) {
    this.moveList.moveToListId = pos + 1;
  }
  moveListSend(id: number) {
    this.moveList.currentListId = id;
    this.boardService.moveList(this.moveList).subscribe(() => this.displayLists());
  }
  moveCardSend() {
    this.boardService.moveList(this.moveList).subscribe(() => this.displayLists());
  }

  openCardDetails(c: Card, ln: string) {
    this.cardData = c;
    this.listName = ln;
    this.showCardDetails = true;
  }

  toggleForm(i: number) {
    this.formId = i;
    this.showAddacardText = false;
    this.newCard.cardName = "";
  }

  drop(event: CdkDragDrop<BoardList[]>) {
    moveItemInArray(this.boardDetails.boardLists, event.previousIndex, event.currentIndex);
    this.moveList.currentListId = this.boardDetails.boardLists[event.currentIndex].id;
    this.moveList.moveToListId = event.currentIndex + 1;
    this.moveList.moveToBoardId = this.moveList.currentBoardId;
    this.boardService.moveList(this.moveList).subscribe();
  }
  dropCard(event: CdkDragDrop<Card[]>, index: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.boardDetails.boardLists[index].cards, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.moveCard.currentListId = +event.previousContainer.id;
    this.moveCard.cardId = event.container.data[event.currentIndex].id;
    this.moveCard.moveToListId = +event.container.id;
    this.moveCard.moveToPosition = event.currentIndex + 1;
    this.boardService.moveCard(this.moveCard).subscribe();
  }
  addDropList(bl: BoardList[]) {

    this.dropListArray = new Array<string>();
    for (let i = 0; i < bl.length; i++) {
      this.dropListArray.push(bl[i].id.toString());
    }
  }
  scroll() {
    const el = document.getElementById("boardListContainer");
    el.scrollBy(300, 0);
  }
}
