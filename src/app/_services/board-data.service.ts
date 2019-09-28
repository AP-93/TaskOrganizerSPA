import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NewBoard } from '../_models/newBoard';
import { NewList } from '../_models/newList';
import { NewCard } from '../_models/newCard';
import { Board, Card } from '../_models/boardData';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MoveList } from '../_models/moveList';
import { MoveCard } from '../_models/moveCard';

@Injectable({
  providedIn: 'root'
})
export class BoardDataService {
   baseUrl = "https://taskorganizerapi20190925095822.azurewebsites.net/api/values/"

 // baseUrl = "https://localhost:44360/api/values/";
  jwtHelper = new JwtHelperService();
  token = "Bearer " + localStorage.getItem("token");
  boardData: Board[];

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': this.token })
  };

  createBoard(newBoard: NewBoard) {
    newBoard.userId = this.getId();
    return this.http.post(this.baseUrl + "createBoard", newBoard, this.httpOptions);
  }
  createList(newList: NewList) {
    return this.http.post(this.baseUrl + "createBoardList", newList, this.httpOptions);
  }
  createCard(newCard: NewCard) {
    return this.http.post(this.baseUrl + "createCard", newCard, this.httpOptions);
  }
  addUserToBoard(username: any, id: number): any {
    return this.http.put(this.baseUrl + "addUserToBoard/" + id, username, this.httpOptions);
  }


  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.baseUrl + "getBoards/" + this.getId(), this.httpOptions);
  }
  getLists(id: number): Observable<Board> {
    return this.http.get<Board>(this.baseUrl + "getLists/" + id, this.httpOptions);
    // .pipe(tap(data => console.log("DATA" + JSON.stringify(data))));
  }
  getBoardUsers(id: number) {
    return this.http.get(this.baseUrl + "getBoardUsers/" + id, this.httpOptions);
    // .pipe(tap(data => console.log("DATA" + JSON.stringify(data))));
  }

  changeCard(card: Card, boardId: number) {
    return this.http.put(this.baseUrl + "ChangeCard/" + boardId, card, this.httpOptions);
  }
  moveList(moveList: MoveList) {
    moveList.userId = this.getId();
    return this.http.put(this.baseUrl + "moveList", moveList, this.httpOptions);
  }
  moveCard(moveCard: MoveCard) {
    return this.http.put(this.baseUrl + "MoveCard", moveCard, this.httpOptions);
  }


  deleteCard(card: Card, boardId: number) {
    return this.http.delete(this.baseUrl + "deleteCard/" + boardId + "/" + card.boardListId + "/" + card.id, this.httpOptions);
  }
  deleteList(boardId: number, listId: number) {
    return this.http.delete(this.baseUrl + "deleteList/" + boardId + "/" + listId, this.httpOptions);
  }
  deleteAllCards(boardId: number, listId: number) {
    return this.http.delete(this.baseUrl + "deleteAllCards/" + boardId + "/" + listId, this.httpOptions);
  }
  removeUserFromBoard(boardId: number, userId: number) {
    return this.http.delete(this.baseUrl + "removeUserFromBoard/" + boardId + "/" + userId, this.httpOptions);
  }


  getId() {
    this.token = localStorage.getItem("token");
    return +this.jwtHelper.decodeToken(this.token).nameid;
  }
}
