import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component'; 
import { CategoryService } from './category.service';
import {FormsModule} from '@angular/forms';
import { ProductService } from './product.service';
import {CustomFormsModule} from 'ng2-validation';
import { DataTableModule } from 'ng-angular8-datatable';
import { 
  MatCheckboxModule, 
  MatListModule, 
  MatCardModule } from '@angular/material';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,    
    FormsModule,
    AppRoutingModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,  
    MatCheckboxModule,
    MatListModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent },
      {path: 'login', component: LoginComponent },
      {path: 'products', component: ProductsComponent },

      {path: 'myOrders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      {path: 'shopping-cart', component: ShoppingCartComponent },
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]}, 

      {path: 'admin/orders', component: AdminOrdersComponent , canActivate: [AuthGuard, AdminAuthGuardService]},
         
      {path: 'admin/products/new', component: ProductFormComponent , canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductFormComponent , canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuard, AdminAuthGuardService]},
    ])
  ],
  providers: [ AngularFireAuth, AuthService, AuthGuard, AdminAuthGuardService, CategoryService, ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
