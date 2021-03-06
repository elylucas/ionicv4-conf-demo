import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sessions',
        children: [
          {
            path: '',
            loadChildren: '../sessions/sessions.module#SessionsPageModule'
          },
          {
            path: 'session/:id',
            loadChildren: '../session-detail/session-detail.module#SessionDetailPageModule'
          }
        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: '',
            loadChildren: '../speakers/speakers.module#SpeakersPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/sessions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sessions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
