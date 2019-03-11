import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Session, Speaker } from '../models/models';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.page.html',
  styleUrls: ['./session-detail.page.scss'],
})
export class SessionDetailPage implements OnInit {

  session: Session;
  speaker: Speaker;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params.id, 10);
    this.dataService.getSession(id).subscribe(session => {
      this.session = session;
      this.isFavorite = this.favoritesService.isFavorite(session);
      this.dataService.getSpeaker(session.speakerId).subscribe(speaker => {
        this.speaker = speaker;
      });
    });
  }

  toggleFavorite(session: Session) {
    this.favoritesService
      .toggleFavorite(session)
      .then(isFavorite => (this.isFavorite = isFavorite));
  }

}
