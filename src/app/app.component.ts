import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oc-frontend';

  loginForm = new FormGroup({
    "username": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", Validators.required),
  })

  constructor(private api: ApiService, fb: FormBuilder) { }

  private generateOneTime() {
    const dt = new Date()
    const min = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    return `${dt.getHours()}${min}`
  }

  submitLogin() {
    let values = this.loginForm.value
    var formData = new FormData();
    formData.append("name", values.username);
    formData.append("password", values.password);
    this.api.login(formData).subscribe(
      (response) => {
        console.log("response: ", response.valid)
        if (response.valid) {
          window.location.href = "https://onecause.com";
        } else {
          alert(`error: ${response.message}`)
        }
      },
      (error) => console.log("err:", error)
    )
  }
}
