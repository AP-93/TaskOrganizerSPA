import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../_models/boardData';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  @Input() cardData: Card;
  @Input() listName: string;

  showCardDescInput: boolean;

  constructor() { }

  ngOnInit() {
    console.log("ovojeuvcomponenti", this.cardData)
    this.cardData.description = "desc"
  }

}
