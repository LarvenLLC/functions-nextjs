import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, action, flow } from "mobx";

class Store extends BaseStore {
  @observable userRegistry = null;

  getUser = () => {
    return this.userRegistry;
  };

  @action setUser = (obj) => {
    this.userRegistry = obj;
    return this.userRegistry;
  };
}

// Make sure the store’s unique name
// AND must be same formula
// Example: getUserStore => userStore
// Example: getProductStore => productStore
export const getUserStore = getOrCreateStore("userStore", Store);
