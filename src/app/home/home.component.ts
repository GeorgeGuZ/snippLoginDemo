import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'snipp-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private userInfo;
    private listOrder = [
        {key: 'firstName', label: 'First name'},
        {key: 'lastName', label: 'Last name'},
        {key: 'gender', label: 'Gender'},
        {key: 'dob', label: 'Date of birth'},
        {key: 'email', label: 'Email'},
        {key: 'address1', label: 'Address 1'},
        {key: 'address2', label: 'Address 2'},
        {key: 'city', label: 'City'},
        {key: 'state', label: 'Province'},
        {key: 'zip', label: 'Zip code'}
    ];

    constructor(private ds: DataService, private router: Router) {
    }

    ngOnInit() {
        this.userInfo = this.ds.getUserInfo();
    }

    onSignOut() {
        this.ds.signOut().then(()=>{
            this.router.navigate(['/login']);
        })
    }

}
