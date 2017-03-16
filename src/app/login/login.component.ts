import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as firebase from "firebase";
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DataService} from "../services/data.service";
import {SpinnerService} from "../services/spinner.service";

@Component({
    selector: 'snipp-login',
    templateUrl: './login.component.html',
    styleUrls: ['../shared/login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('loginModal')
    modal: ModalComponent; //TODO centralize the modal element
    loginForm: FormGroup;
    modalHeader: string;
    modalBody: string;

    constructor(private router: Router, private fb: FormBuilder, private ds: DataService, private ss: SpinnerService) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
            password: ['', Validators.required]
        })
    }

    onRegister() {
        this.router.navigate(['/register']);
    }

    onSubmit() {
        this.ss.show();
        firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
            .catch((error: any) => {
                var errorMsg;
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMsg = 'Invalid email.';
                        break;
                    case 'auth/user-disabled':
                        errorMsg = 'This user is disabled.';
                        break;
                    case 'auth/user-not-found':
                        errorMsg = 'User not found.';
                        break;
                    case 'auth/wrong-password':
                        errorMsg = 'Wrong password.';
                        break;
                    default:
                        errorMsg = 'Cannot login.';
                        break;
                }
                this.modalHeader = 'Login error';
                this.modalBody = errorMsg;
                this.modal.open();
            })
            .then((data) => {
                if (data) {
                    this.ds.readUserData(data.uid).then(
                        () => {
                            this.router.navigate(['/home']);
                        }
                    );
                }
            })
            .then(() => {
                this.ss.hide();
            });
    }

}
