import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

class PlayerToAdd {
  name: string;
  position: string;
  team: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  pla = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
