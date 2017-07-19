import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {
      const shoppingItemId = this.navParams.get('shoppingItemId');
      console.log(shoppingItemId);
      this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
  }

}
