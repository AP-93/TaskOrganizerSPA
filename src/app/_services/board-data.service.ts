import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { newBoard } from '../_models/newBoard';
import { newList } from '../_models/newList';
import { newCard } from '../_models/newCard';
import { Board } from '../_models/boardData';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { userForAdd } from '../_models/userForAdd';

@Injectable({
  providedIn: 'root'
})
export class BoardDataService {

  baseUrl = "https://localhost:44360/api/values/";
  jwtHelper = new JwtHelperService();
  token = "Bearer " + localStorage.getItem("token");
  // decodedToken = this.jwtHelper.decodeToken(this.token);
  // userId =+this.decodedToken.nameid;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': this.token })
  }




  createBoard(newBoard: newBoard) {
    newBoard.userId = this.getId();
    console.log("ovojeposlano ", newBoard);
    return this.http.post(this.baseUrl + "createBoard", newBoard, this.httpOptions)
  }
  createList(newList: newList) {
    console.log("ovojeposlano ", newList);
    return this.http.post(this.baseUrl + "createBoardList", newList, this.httpOptions)
  }
  createCard(newCard: newCard) {
    console.log("ovojeposlano ", newCard);
    return this.http.post(this.baseUrl + "createCard", newCard, this.httpOptions)
  }
  addUserToBoard(username: any, id: number): any {
    return this.http.put(this.baseUrl + "addUserToBoard/" + id, username, this.httpOptions)
  }


  getBoards() {
    return this.http.get(this.baseUrl + "getBoards/" + this.getId(), this.httpOptions)
  }
  getLists(id: number): Observable<Board> {
    return this.http.get<Board>(this.baseUrl + "getLists/" + id, this.httpOptions).pipe(
      tap(data => console.log("DATA" + JSON.stringify(data))))
  }
  getBoardUsers(id: number) {
    return this.http.get(this.baseUrl + "getBoardUsers/" + id, this.httpOptions).pipe(
      tap(data => console.log("DATA" + JSON.stringify(data))))
  }


  deleteList(boardId: number, listId: number) {
    return this.http.delete(this.baseUrl + "deleteList/" + boardId + "/" + listId, this.httpOptions)
  }
  deleteAllCards(boardId: number, listId: number) {
    return this.http.delete(this.baseUrl + "deleteAllCards/" + boardId + "/" + listId, this.httpOptions)
  }
  removeUserFromBoard(boardId: number, userId: number) {
    return this.http.delete(this.baseUrl + "removeUserFromBoard/" + boardId + "/" + userId, this.httpOptions)
  }


  getId() {
    this.token = localStorage.getItem("token");
    return +this.jwtHelper.decodeToken(this.token).nameid;
  }
}
