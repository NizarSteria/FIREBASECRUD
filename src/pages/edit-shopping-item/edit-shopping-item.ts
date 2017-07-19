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
  shoppingItem = {} as ShoppingItem;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {
      const shoppingItemId = this.navParams.get('shoppingItemId');
      console.log(shoppingItemId);
      this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);
      this.shoppingItemRef$.subscribe(
        shoppingItem => this.shoppingItem =shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    // Update our Firebase node with new item data
    this.shoppingItemRef$.update(shoppingItem);
     // Send the user back to the ShoppingListPage
    this.navCtrl.pop();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
  }

}
