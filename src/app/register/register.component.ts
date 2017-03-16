import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as firebase from "firebase";
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DataService} from "../services/data.service";

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

    constructor(private router: Router, private fb: FormBuilder, private ds: DataService) {
    }

    ngOnInit() {
        this.initRegisterForm();
    }

    initRegisterForm() {
        this.registerForm = this.fb.group({
            firstName: [''],
            email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
            lastName: [''],
            address1: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: ['', [Validators.required]],
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

        firebase.auth().createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .catch((error:any) => {
                this.modalConfig.header = "Register Error";
                this.modalConfig.body = error.code;
                this.modal.open();
                return false;
            })
            .then((data) => {
                this.ds.writeUserData(this.registerForm.value, data.uid).then(()=>{
                    this.modalConfig.header = "Register Success";
                    this.modalConfig.body = "Register successfully!";
                    this.modal.open();
                });
            });
    }

}
