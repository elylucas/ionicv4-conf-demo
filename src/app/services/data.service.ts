import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { groupBy, map, mergeMap, reduce, filter } from 'rxjs/operators';
import { Session, SessionGroup, Speaker } from '../models/models';
import { FavoritesService } from './favorites.service';

@Injectable()
export class DataService {
  constructor(private http: HttpClient, private favoritesService: FavoritesService) {}

  getData() {
    return this.http.get('assets/data/data.json');
  }

  getGroupedSessions(segment: string): Observable<SessionGroup[]> {
    return this.getSessions().pipe(
      mergeMap(x => from(x)),
      filter(session => {
        return segment === 'all' ? true : this.favoritesService.isFavorite(session);
      }),
      groupBy(p => p.timeStart),
      mergeMap(group =>
        group.pipe(reduce((acc: Session[] | string[], cur) => [...acc, cur], [group.key]))
      ),
      reduce((acc, cur) => [...acc, { timeStart: cur[0], sessions: cur.slice(1) }], [])
    );
  }

  getSessions(): Observable<Session[]> {
    return this.getData().pipe(map((data: any) => data.sessions));
  }

  getSpeakers(): Observable<Speaker[]> {
    return this.getData().pipe(
      map((data: any) =>
        data.speakers.sort((x, y) => {
          if (x.name < y.name) {
            return -1;
          } else if (x.name > y.name) {
            return 1;
          }
          return 0;
        })
      )
    );
  }

  getSession(id: number): Observable<Session> {
    return this.getSessions().pipe(map(sessions => sessions.find(s => s.id === id)));
  }

  getSpeaker(id: number): Observable<Speaker> {
    return this.getSpeakers().pipe(map(speaker => speaker.find(s => s.id === id)));
  }
}
