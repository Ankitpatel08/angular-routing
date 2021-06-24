import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanCompopnentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanCompopnentDeactivate {
  server: {id: number, name: string, status: string};
  serverId;
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.serverId = params.id;
    });

    this.route.queryParams.subscribe(query => {
      this.allowEdit = query['allowEdit'] == '1' ? true : false;
    });
    this.route.fragment.subscribe(frag => console.log(frag));

    this.server = this.serversService.getServer(+this.serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName != this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved)  {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
