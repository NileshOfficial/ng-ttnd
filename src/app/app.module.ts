import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/genericComponents/modal/modal.component';
import { InputComponent } from './components/genericComponents/input/input.component';
import { TextFieldDirective } from './directives/textField.directive';
import { BuzzComponent } from './components/buzz/buzz.component';
import { BuzzPostComponent } from './components/buzz/buzzpost/buzzpost.component';
import { ClickawayDirective } from './directives/clickaway.directive';
import { MultilineInputDirective } from './directives/multilineInput.directive';
import { FontDirective } from './directives/font.directive';
import { LoginBoardComponent } from './components/login-board/login-board.component';
import { AuthCallbackComponent } from './components/login-board/auth-callback/auth-callback.component';
import { HomeComponent } from './components/home/home.component';
import { CommentsSectionComponent } from './components/buzz/commentsSection/commentsSection.component';
import { CommentComponent } from './components/buzz/commentsSection/comment/comment.component';
import { RenderDirective } from './directives/render.directive';
import { InfiniteScrollerComponent } from './components/infiniteScroller/infiniteScroller.component';

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
		HomeComponent,
		CommentsSectionComponent,
		CommentComponent,
		RenderDirective,
		InfiniteScrollerComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, InfiniteScrollModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
