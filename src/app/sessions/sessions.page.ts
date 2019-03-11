import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { SessionGroup, Session } from '../models/models';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss']
})
export class SessionsPage implements OnInit {
  segment = 'all';
  sessionGroups: SessionGroup[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.updateSessions();
  }

  updateSessions() {
    this.dataService
      .getGroupedSessions(this.segment)
      .subscribe(sessionGroups => (this.sessionGroups = sessionGroups));
  }

  segmentChanged($event) {
    this.updateSessions();
  }

  trackByFnSession(index, session: Session) {
    return session.id;
  }

  trackByFnSessionGroup(index, sessionGroup: SessionGroup) {
    return sessionGroup.timeStart;
  }
}
