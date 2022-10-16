import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onOpenTransfers() {
    this.router.navigate(['pmd/pmd311']);
  }

}
