import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Speaker } from '../models/models';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit {
  speakers: Observable<Speaker[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.speakers = this.dataService.getSpeakers();
  }

}
