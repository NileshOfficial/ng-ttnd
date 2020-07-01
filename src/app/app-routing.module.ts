import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './components/login-board/auth-callback/auth-callback.component';
import { LoginBoardComponent } from './components/login-board/login-board.component';
import { HomeComponent } from './components/home/home.component';
import { BuzzComponent } from './components/buzz/buzz.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';

const routes: Routes = [
	{ path: '', redirectTo: '/auth/login', pathMatch: 'full' },
	{
		path: 'auth',
		children: [
			{ path: '', component: AuthCallbackComponent },
			{ path: 'login', component: LoginBoardComponent }
		]
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{ path: 'buzz', component: BuzzComponent },
			{ path: 'myprofile', component: ProfilePageComponent },
			{ path: 'profile', component: ProfilePageComponent },
			{ path: 'complaints', component: ComplaintsComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
