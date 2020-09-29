import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, action, flow } from "mobx";

class Store extends BaseStore {
  @observable inShop = false;

  @action toggleShop = () => {
    let val = this.inShop;
    this.inShop = !val;
    return this.inShop;
  };
}

// Make sure the store’s unique name
// AND must be same formula
// Example: getUserStore => userStore
// Example: getProductStore => productStore
export const getUiStore = getOrCreateStore("uiStore", Store);
