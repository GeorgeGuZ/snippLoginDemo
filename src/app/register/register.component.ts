import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as firebase from "firebase";
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DataService} from "../services/data.service";
import {SpinnerService} from "../services/spinner.service";

@Component({
    selector: 'snipp-register',
    templateUrl: './register.component.html',
    styleUrls: ['../shared/login.component.scss']
})
export class RegisterComponent implements OnInit {

    @ViewChild('myModal')
    modal: ModalComponent;
    registerForm: FormGroup;
    modalHeader: string;
    modalBody: string;
    modalConfig = {
        header: '',
        body: ''
    };
    provinces = [
        {label: 'Ontario', value: 'ON'},
        {label: 'Quebec', value: 'QC'},
        {label: 'Nova Scotia', value: 'NS'},
        {label: 'New Brunswick', value: 'NB'},
        {label: 'Manitoba', value: 'MB'},
        {label: 'British Columbia', value: 'BC'},
        {label: 'Prince Edward Island', value: 'PE'},
        {label: 'Saskatchewan', value: 'SK'},
        {label: 'Alberta', value: 'AB'},
        {label: 'Newfoundland and Labrador', value: 'NL'}
    ];
    genders = [
        {label: 'Male', value: 'MALE'},
        {label: 'Female', value: 'FEMALE'},
        {label: 'Other', value: 'OTHER'},
    ];

    constructor(private router: Router, private fb: FormBuilder, private ds: DataService, private ss: SpinnerService) {
    }

    ngOnInit() {
        this.initRegisterForm();
    }

    initRegisterForm() {
        var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

        this.registerForm = this.fb.group({
            firstName: [''],
            email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
            lastName: [''],
            address1: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: ['', [Validators.required, Validators.pattern(regex)]],
            gender: [''],
            dob: [''],
            password: ['', Validators.required],
            confirmPassword: ['']
        })
    }

    onLogin() {
        this.router.navigate(['/login']);
    }

    onSubmit() {
        this.ss.show();
        firebase.auth().createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .catch((error:any) => {
                this.modalConfig.header = "Register Error";
                this.modalConfig.body = error.code;
                this.modal.open();
                return false;
            })
            .then((data) => {
                this.ds.writeUserData(this.registerForm.value, data.uid).then(()=>{
                    this.ss.hide();
                    this.modalConfig.header = "Register Success";
                    this.modalConfig.body = "Register successfully!";
                    this.modal.open();
                });
            });
    }

}
