import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../_models/boardData';
import { BoardDataService } from '../_services/board-data.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  @Input() cardData: Card;
  @Input() listName: string;
  @Input() boardId: number;
  @Output() close = new EventEmitter();
  showCardDescInput: boolean;

  constructor(private boardService: BoardDataService) { }

  ngOnInit() {
  }

  SaveCardData() {
    this.boardService.changeCard(this.cardData, this.boardId).subscribe(() => console.log(this.cardData));
  }
  DeleteCard() {
    this.boardService.deleteCard(this.cardData, this.boardId).subscribe(() => this.close.emit(null));
  }
}
