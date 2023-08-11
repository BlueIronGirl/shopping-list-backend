import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "../../store/einkaufszettel/einkaufszettel.actions";
import {selectAllArtikel} from "../../store/einkaufszettel/einkaufszettel.selectors";
import {Artikel} from "../../entities/artikel";

@Component({
  selector: 'app-einkaufszettel',
  templateUrl: './einkaufszettel.component.html',
  styleUrls: ['./einkaufszettel.component.scss']
})
export class EinkaufszettelComponent implements OnInit{
  artikels!: Artikel[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(EinkaufszettelActions.loadEinkaufszettels());

    this.store.select(selectAllArtikel).subscribe(artikels => this.artikels = artikels);
  }

  deleteArtikel(artikel: Artikel) {
    this.store.dispatch(EinkaufszettelActions.deleteArtikel({data: artikel}));
  }
}
