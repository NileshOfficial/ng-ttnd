import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { ModalComponent } from "./components/genericComponents/modal/modal.component";
import { InputComponent } from "./components/genericComponents/input/input.component";
import { TextFieldDirective } from "./directives/textField.directive";
import { BuzzComponent } from "./components/buzz/buzz.component";
import { BuzzPostComponent } from "./components/buzz/buzzpost/buzzpost.component";
import { ClickawayDirective } from "./directives/clickaway.directive";
import { MultilineInputDirective } from "./directives/multilineInput.directive";
import { FontDirective } from "./directives/font.directive";
import { LoginBoardComponent } from './components/login-board/login-board.component';
import { AuthCallbackComponent } from './components/login-board/auth-callback/auth-callback.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ModalComponent,
        InputComponent,
        BuzzComponent,
        BuzzPostComponent,
        TextFieldDirective,
        ClickawayDirective,
        MultilineInputDirective,
        FontDirective,
        LoginBoardComponent,
        AuthCallbackComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
