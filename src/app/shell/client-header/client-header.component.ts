import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../modules/bpm/client.model';


@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit, AfterContentChecked {
  clientData: Client;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const clientDataParams = JSON.parse(localStorage.getItem('clientData'));
    this.clientData = clientDataParams;
  }

  ngAfterContentChecked() {
    const clientDataParams = JSON.parse(localStorage.getItem('clientData'));
    this.clientData = clientDataParams;
  }

  onLogout() {
    this.router.navigate(['/bpm']);
    localStorage.removeItem('clientData');
  }
}
