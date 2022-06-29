import { observable, action, makeAutoObservable } from 'mobx'

export class GeneralStore {
    constructor() {
        this.itemName = '';
        this.storeName = '';
        this.cityName = '';
    }

}